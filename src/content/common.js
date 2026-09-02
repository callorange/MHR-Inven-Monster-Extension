/**
 * content-script에서 사용되는 공통 변수/함수
 * DOM Null Safety 및 환경 독립적(Node.js / 브라우저) 호환 지원
 */

/**
 *  @typedef {Object} CommonInfo
 *  @property {Boolean} isReady DOM 탐색 성공 여부 (table 및 form 존재 여부)
 *  @property {HTMLFormElement|null} form 인벤 몬스터 페이지 검색 폼
 *  @property {Object} star 인벤 별이미지 객체
 *  @property {String} star.zero X 이미지 HTML => 별 0개
 *  @property {String} star.one 별이미지 1개 HTML
 *  @property {Object} table 몬스터 테이블 객체
 *  @property {HTMLTableElement|null} table.all 몬스터테이블
 *  @property {HTMLTableColElement|null} table.colgroup 몬스터테이블 colgroup
 *  @property {HTMLTableSectionElement|null} table.head 몬스터테이블 head
 *  @property {HTMLTableSectionElement|null} table.body 몬스터테이블 body
 *  @property {Object} func 함수 객체
 *  @property {Function} func.checkApexElement tr.dataset.name에 '주인'이 포함되었는지 리턴
 */

/** @type {CommonInfo} content-script에서 공통으로 사용할 변수 객체 */
const common = (function () {
  const isDocumentAvailable = typeof document !== "undefined";

  /** @type {HTMLTableElement|null} 몬스터 테이블 */
  const m_table = isDocumentAvailable ? document.querySelector(".table.list") : null;

  /** @type {HTMLFormElement|null} 검색 폼 */
  const m_form = isDocumentAvailable ? document.querySelector(".filter_form") : null;

  return {
    isReady: Boolean(m_table && m_form),
    form: m_form,
    table: {
      all: m_table,
      colgroup: m_table ? m_table.querySelector("colgroup") : null,
      head: m_table ? m_table.querySelector("thead") : null,
      body: m_table ? m_table.querySelector("tbody") : null,
    },
    star: {
      zero: `<img src="https://static.inven.co.kr/image_2011/mhf/common/14x14_x.png" class="icon_img2">`,
      one: `<img src="https://static.inven.co.kr/image_2011/mhf/common/14x14_star.png" class="icon_img2">`,
    },
    func: {
      checkApexElement: function (element) {
        if (!element || !element.dataset || typeof element.dataset.name !== "string") {
          return false;
        }
        return element.dataset.name.includes("주인");
      },
    },
  };
})();

// Node.js CommonJS & ESM interop
if (typeof module !== "undefined" && module.exports) {
  module.exports = { common };
}

// Browser Global (Content Script)
if (typeof window !== "undefined") {
  window.common = common;
} else if (typeof globalThis !== "undefined") {
  globalThis.common = common;
}
