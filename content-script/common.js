/**
 * content-script에서 사용되는 공통 변수/함수
 */

/**
 *  @typedef {Object} CommonInfo
 *  @property {HTMLFormElement} form 인벤 몬스터 페이지 검색 폼
 *  @property {Object} table 몬스터 테이블 객체
 *  @property {HTMLTableElement} table.all 몬스터테이블
 *  @property {HTMLTableColElement} table.colgroup 몬스터테이블 colgroup
 *  @property {HTMLTableSectionElement} table.head 몬스터테이블 head
 *  @property {HTMLTableSectionElement} table.body 몬스터테이블 body
 *  @property {Object} star 인벤 별이미지 객체
 *  @property {HTMLImageElement} star.zero X 이미지 => 별 0개
 *  @property {HTMLImageElement} star.one 별이미지 1개
 */

/** @type {CommonInfo} content-script에서 공통으로 사용할 변수 객체 */
const common = (function () {
  /** @type {HTMLFormElement} 검색폼 */
  let filter_form = document.querySelector(".filter_form");

  /** @type {HTMLTableElement} 몬스터 테이블 */
  let m_table = document.querySelector(".table.list");

  /** @type {HTMLTableColElement} 몬스터 테이블 colgroup */
  let m_table_colgroup = m_table.querySelector("colgroup");

  /** @type {HTMLTableSectionElement} 몬스터 테이블 head */
  let m_table_head = m_table.querySelector("thead");

  /** @type {HTMLTableSectionElement} 몬스터 테이블 body */
  let m_table_body = m_table.querySelector("tbody");

  /** @type {HTMLImageElement} */
  let img = document.createElement("img");
  img.class = "icon_img2";

  /** @type {HTMLImageElement} 인벤 X 이미지 */
  let star_0 = img.cloneNode();
  star_0.src = "https://static.inven.co.kr/image_2011/mhf/common/14x14_x.png";

  /** @type {HTMLImageElement} 인벤 별 이미지 */
  let star_1 = img.cloneNode();
  star_1.src =
    "https://static.inven.co.kr/image_2011/mhf/common/14x14_star.png";

  return {
    form: filter_form,
    table: {
      all: m_table,
      colgroup: m_table_colgroup,
      head: m_table_head,
      body: m_table_body,
    },
    star: {
      zero: star_0,
      one: star_1,
    },
  };
})();
