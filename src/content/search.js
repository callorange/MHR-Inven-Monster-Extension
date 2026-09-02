/**
 * 몬스터 검색 확장 및 FilterManager 연동 모듈
 * 
 * 인벤 검색 폼의 이름 검색 입력 및 제출 이벤트를 FilterManager와 연동하여
 * 괴이 탐구 필터(레벨/소재)와 검색어 조건이 결합된 통합 필터링을 수행합니다.
 */
(function (global) {
  function initSearch(options = {}) {
    const commonObj =
      options.common || (typeof common !== "undefined" ? common : null);
    if (!commonObj || !commonObj.isReady || !commonObj.form) {
      return null;
    }

    const nameInput = commonObj.form.querySelector("input[name='name']");
    if (!nameInput) {
      return null;
    }

    let filterManager =
      options.filterManager ||
      (typeof window !== "undefined" && window.FilterManager) ||
      (typeof globalThis !== "undefined" && globalThis.FilterManager) ||
      null;

    if (!filterManager && typeof require !== "undefined") {
      try {
        const fmModule = require("./filter-state.js");
        filterManager =
          fmModule.defaultFilterManager ||
          fmModule.FilterManager ||
          fmModule;
      } catch (_) {
        // ignore
      }
    }

    /**
     * 이름 검색 폼 전송 이벤트 처리
     * @param {Event} [e]
     */
    function handleSubmit(e) {
      const query = nameInput.value || "";

      if (filterManager) {
        filterManager.setKeyword(query);
        const rows =
          commonObj.table && commonObj.table.body
            ? commonObj.table.body.querySelectorAll("tr")
            : [];
        filterManager.apply(rows);
      }

      if (
        commonObj.form &&
        typeof commonObj.form.scrollIntoView === "function"
      ) {
        commonObj.form.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }

    /**
     * 검색 입력창 내용 변경 이벤트 처리
     * 검색창이 비워졌을 때 기존 괴이 필터 상태로 부드럽게 복원
     * @param {Event} [e]
     */
    function handleInput(e) {
      if (nameInput.value.trim() === "") {
        if (filterManager) {
          filterManager.setKeyword("");
          const rows =
            commonObj.table && commonObj.table.body
              ? commonObj.table.body.querySelectorAll("tr")
              : [];
          filterManager.apply(rows);
        }
      }
    }

    commonObj.form.addEventListener("submit", handleSubmit);
    nameInput.addEventListener("input", handleInput);

    return {
      handleSubmit,
      handleInput,
      cleanup: () => {
        commonObj.form.removeEventListener("submit", handleSubmit);
        nameInput.removeEventListener("input", handleInput);
      },
    };
  }

  // 자동 초기화 실행
  const searchController = initSearch();

  // Node.js CommonJS & ESM interop
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      initSearch,
      searchController,
    };
    module.exports.default = initSearch;
  }

  // Browser Global
  if (typeof window !== "undefined") {
    window.SearchController = searchController;
    window.initSearch = initSearch;
  } else if (typeof globalThis !== "undefined") {
    globalThis.SearchController = searchController;
    globalThis.initSearch = initSearch;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);

// 스크립트 실행 완료 메시지 전송 (확장 컨텍스트 언로드/리로드 대비 try-catch)
try {
  if (typeof chrome !== "undefined" && chrome?.runtime?.sendMessage) {
    chrome.runtime.sendMessage({ msg: "script-complete" }, () => {
      if (chrome.runtime?.lastError) {
        // 백그라운드 리스너 부재 또는 컨텍스트 무효화 무시
      }
    });
  }
} catch (_) {
  // 브라우저 확장 컨텍스트 언로드/리로드 상황 안전 방어
}
