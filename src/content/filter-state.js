/**
 * 통합 필터 상태 관리자 (Unified Filter State Manager)
 * 
 * 괴이 레벨(EX), 괴이 소재(Material), 이름/수식어 검색어(Keywords)를
 * 단일 파이프라인으로 통합 평가하고 DOM 표시 및 상태 구독을 관리합니다.
 * 
 * Content Script (브라우저 전역 스코프) 및 Node.js (CommonJS / ESM) 모두 호환
 */
(function (global) {
  // search-parser 의존성 로드 또는 fallback
  let searchParserModule = null;
  if (typeof require !== "undefined") {
    try {
      searchParserModule = require("./search-parser.js");
    } catch (_) {
      // ignore
    }
  }

  function resolveSearchParser() {
    if (searchParserModule) {
      return searchParserModule;
    }
    if (typeof window !== "undefined" && window.SearchParser) {
      return window.SearchParser;
    }
    if (typeof globalThis !== "undefined" && globalThis.SearchParser) {
      return globalThis.SearchParser;
    }
    if (
      typeof splitQueryKeywords === "function" &&
      typeof parseQuery === "function"
    ) {
      return { splitQueryKeywords, parseQuery };
    }
    // Fallback parser if not loaded
    return {
      splitQueryKeywords: function (rawQuery) {
        if (!rawQuery || typeof rawQuery !== "string") return [];
        return rawQuery
          .replaceAll(",", "/")
          .split("/")
          .map((k) => k.trim())
          .filter((k) => k.length > 0);
      },
      parseQuery: function (keyword) {
        let isNormalOnly = false;
        let isVariantOnly = false;
        let isApexOnly = false;
        let cleanName = (keyword || "").trim();

        if (cleanName.includes("!")) {
          isNormalOnly = true;
          cleanName = cleanName.replaceAll("!", "");
        }
        if (cleanName.includes("@")) {
          isVariantOnly = true;
          cleanName = cleanName.replaceAll("@", "");
        }
        if (cleanName.includes("#")) {
          isApexOnly = true;
          cleanName = cleanName.replaceAll("#", "");
        }

        return {
          name: cleanName.trim(),
          isNormalOnly,
          isVariantOnly,
          isApexOnly,
        };
      },
    };
  }

  /**
   * FilterManager 클래스
   */
  class FilterManager {
    /**
     * @param {Object} [options]
     * @param {Object} [options.searchParser]
     */
    constructor(options = {}) {
      this._searchParser = options.searchParser || resolveSearchParser();
      this.exLevel = null;
      this.exMaterial = null;
      this.rawKeyword = "";
      this.parsedKeywords = [];
      this.listeners = new Set();
    }

    /**
     * 괴이 레벨 설정 (동일 레벨 전달 시 토글 해제 지원)
     * @param {string|number|null} level - 예: "1" ~ "9", "EX1", 5
     * @returns {FilterManager}
     */
    setExLevel(level) {
      if (level === null || level === undefined || level === "") {
        this.exLevel = null;
        return this;
      }

      const normalizedLevel = String(level).trim().replace(/^EX/i, "");
      if (!normalizedLevel || this.exLevel === normalizedLevel) {
        this.exLevel = null;
      } else {
        this.exLevel = normalizedLevel;
      }
      return this;
    }

    /**
     * 괴이 소재 설정 (동일 소재 전달 시 토글 해제 지원)
     * @param {string|null} material - 예: "견골", "중용골", "흉비늘"
     * @returns {FilterManager}
     */
    setExMaterial(material) {
      if (material === null || material === undefined || material === "") {
        this.exMaterial = null;
        return this;
      }

      const normalizedMaterial = String(material).trim();
      if (!normalizedMaterial || this.exMaterial === normalizedMaterial) {
        this.exMaterial = null;
      } else {
        this.exMaterial = normalizedMaterial;
      }
      return this;
    }

    /**
     * 원본 검색어 설정 및 parsedKeywords 갱신
     * @param {string} rawKeyword
     * @returns {FilterManager}
     */
    setKeyword(rawKeyword) {
      this.rawKeyword = typeof rawKeyword === "string" ? rawKeyword : "";
      const rawTokens = this._searchParser.splitQueryKeywords(this.rawKeyword);
      this.parsedKeywords = rawTokens.map((token) =>
        this._searchParser.parseQuery(token)
      );
      return this;
    }

    /**
     * 모든 필터 초기화
     * @returns {FilterManager}
     */
    resetAll() {
      this.exLevel = null;
      this.exMaterial = null;
      this.rawKeyword = "";
      this.parsedKeywords = [];
      return this;
    }

    /**
     * 현재 필터 상태 스냅샷 반환
     * @returns {{ exLevel: string|null, exMaterial: string|null, rawKeyword: string, parsedKeywords: Array<{ name: string, isNormalOnly: boolean, isVariantOnly: boolean, isApexOnly: boolean }> }}
     */
    getState() {
      return {
        exLevel: this.exLevel,
        exMaterial: this.exMaterial,
        rawKeyword: this.rawKeyword,
        parsedKeywords: this.parsedKeywords.map((pk) => ({ ...pk })),
      };
    }

    /**
     * 단일 몬스터 데이터 또는 DOM 행 요소가 현재 필터 조건을 만족하는지 평가
     * @param {Object} rowData - { name, anomalyLevel, anomalyAfflicted } 또는 dataset을 가진 DOM 요소
     * @returns {boolean}
     */
    evaluateRow(rowData) {
      if (!rowData) return false;

      // DOM dataset 또는 일반 객체 속성 추출
      const name =
        (rowData.name !== undefined
          ? rowData.name
          : rowData.dataset && rowData.dataset.name) || "";
      const anomalyLevel =
        rowData.anomalyLevel !== undefined
          ? rowData.anomalyLevel
          : rowData.dataset && rowData.dataset.anomalyLevel;
      const anomalyAfflicted =
        (rowData.anomalyAfflicted !== undefined
          ? rowData.anomalyAfflicted
          : rowData.dataset && rowData.dataset.anomalyAfflicted) || "";

      // 1. 괴이 레벨 매칭
      const matchLevel =
        !this.exLevel || String(anomalyLevel) === this.exLevel;

      // 2. 괴이 소재 매칭
      const matchMaterial =
        !this.exMaterial ||
        (anomalyAfflicted
          ? anomalyAfflicted
              .split("/")
              .map((s) => s.trim())
              .filter(Boolean)
              .includes(this.exMaterial)
          : false);

      // 3. 검색어 및 수식어 매칭
      const matchKeyword =
        this.parsedKeywords.length === 0 ||
        this.parsedKeywords.some((pk) => {
          // 이름 매칭 (pk.name이 빈 문자열이면 이름 검사는 통과)
          if (pk.name && !name.includes(pk.name)) {
            return false;
          }

          // ! : 일반종만 (주인, 희소, 아종 제외)
          if (pk.isNormalOnly) {
            if (
              name.includes("주인") ||
              name.includes("희소") ||
              name.includes("아종")
            ) {
              return false;
            }
          }

          // @ : 아종/희소종만
          if (pk.isVariantOnly) {
            if (!name.includes("희소") && !name.includes("아종")) {
              return false;
            }
          }

          // # : 주인만
          if (pk.isApexOnly) {
            if (!name.includes("주인")) {
              return false;
            }
          }

          return true;
        });

      return Boolean(matchLevel && matchMaterial && matchKeyword);
    }

    /**
     * DOM tr 목록에 필터를 적용하고 표시 몬스터 개수를 리턴 및 통지
     * @param {NodeList|Array} [rowElements] - 테이블 tr 요소 목록
     * @returns {number} visibleCount
     */
    apply(rowElements) {
      const rows =
        rowElements ||
        (typeof common !== "undefined" &&
        common.table &&
        common.table.body
          ? common.table.body.querySelectorAll("tr")
          : []);

      let visibleCount = 0;
      for (const row of rows) {
        const isMatch = this.evaluateRow(row);
        if (row && row.style) {
          row.style.display = isMatch ? "table-row" : "none";
        }
        if (isMatch) {
          visibleCount++;
        }
      }

      this.notifySubscribers(visibleCount);
      return visibleCount;
    }

    /**
     * 상태 변경 이벤트 리스너 등록
     * @param {Function} callback
     * @returns {Function} unsubscribe 함수
     */
    subscribe(callback) {
      if (typeof callback === "function") {
        this.listeners.add(callback);
      }
      return () => {
        this.listeners.delete(callback);
      };
    }

    /**
     * 상태 변경 리스너 등록 별칭 (onStateChange)
     * @param {Function} callback
     * @returns {Function}
     */
    onStateChange(callback) {
      return this.subscribe(callback);
    }

    /**
     * 구독자들에게 현재 상태 및 visibleCount 브로드캐스트
     * @param {number} [visibleCount]
     */
    notifySubscribers(visibleCount) {
      const stateSnapshot = {
        ...this.getState(),
        visibleCount: typeof visibleCount === "number" ? visibleCount : null,
      };

      for (const listener of this.listeners) {
        try {
          listener(stateSnapshot);
        } catch (err) {
          console.error("[FilterManager] Subscriber listener error:", err);
        }
      }
    }
  }

  function createFilterManager(options) {
    return new FilterManager(options);
  }

  const defaultInstance = new FilterManager();

  // Node.js CommonJS & ESM interop
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      FilterManager,
      createFilterManager,
      defaultFilterManager: defaultInstance,
      filterManager: defaultInstance,
    };
    module.exports.default = defaultInstance;
  }

  // Browser Global (Content Script)
  if (typeof window !== "undefined") {
    window.FilterManager = defaultInstance;
    window.FilterManagerClass = FilterManager;
    window.createFilterManager = createFilterManager;
  } else if (typeof globalThis !== "undefined") {
    globalThis.FilterManager = defaultInstance;
    globalThis.FilterManagerClass = FilterManager;
    globalThis.createFilterManager = createFilterManager;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
