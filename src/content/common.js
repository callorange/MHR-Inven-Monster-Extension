/**
 * content-script에서 사용되는 공통 변수/함수
 */

/**
 *  @typedef {Object} CommonInfo
 *  @property {HTMLFormElement} form 인벤 몬스터 페이지 검색 폼
 *  @property {Object} option 검색 옵션
 *  @property {Boolean} option.excludeApex 검색 옵션
 *  @property {Object} table 몬스터 테이블 객체
 *  @property {HTMLTableElement} table.all 몬스터테이블
 *  @property {HTMLTableColElement} table.colgroup 몬스터테이블 colgroup
 *  @property {HTMLTableSectionElement} table.head 몬스터테이블 head
 *  @property {HTMLTableSectionElement} table.body 몬스터테이블 body
 *  @property {Object} star 인벤 별이미지 객체
 *  @property {String} star.zero X 이미지 HTML => 별 0개
 *  @property {String} star.one 별이미지 1개 HTML
 *  @property {Object} func 함수 객체
 *  @property {Function} func.checkApexElement tr.dataset.name에 '주인'이 포함되었는지 리턴
 */

/** @type {CommonInfo} content-script에서 공통으로 사용할 변수 객체 */
const common = (function () {

  /** @type {HTMLTableElement} 몬스터 테이블 */
  let m_table = document.querySelector(".table.list");

  return {
    form: document.querySelector(".filter_form"),
    table: {
      all: m_table,
      colgroup: m_table.querySelector("colgroup"),
      head: m_table.querySelector("thead"),
      body: m_table.querySelector("tbody"),
    },
    star: {
      zero: `<img src="https://static.inven.co.kr/image_2011/mhf/common/14x14_x.png" class="icon_img2">`,
      one: `<img src="https://static.inven.co.kr/image_2011/mhf/common/14x14_star.png" class="icon_img2">`,
    },
    func: {
      checkApexElement: function (element) {
        if (element.dataset.name.includes("주인")) {
            return true;
        }
        return false;
      },
    },
  };
})();
