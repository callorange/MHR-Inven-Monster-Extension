/**
 * 몬스터 테이블 ui 추가
 */

/**
 * 몬스터 테이블 레이아웃 수정
 */
(function () {
  common.table.all.tableLayout = "auto";
  common.table.colgroup.innerHTML = `<col width="11%"><col width="*"><col width="6%"><col width="16%"><col width="10%"><col width="11%"><col width="8%"><col width="15%">`;
})();

/**
 * 몬스터 테이블 thead 확장
 */
(function () {
  // th 생성
  let anti_th = document.createElement("th");
  anti_th.innerHTML = "특효";

  // thead에 th 추가
  common.table.head
    .querySelector("tr")
    .append(anti_th, common.table.head.querySelector("th.parts"));
})();

/**
 * 몬스터 테이블 tbody 확장
 */
(function () {
  // td 생성 구문
  let anti_td = document.createElement("td");
  anti_td.style.whiteSpace = "nowrap";

  // tbody tr 순회
  for (let element of common.table.body.querySelectorAll("tr")) {
    // element dataset
    let el_data = element.dataset;

    // element name td
    let el_name = element.querySelector("td.name");

    // 괴이화 정보 추가
    if (Number(el_data.anomalyLevel)) {
      let ex_html = `<br><strong style='color:#dc3545;'>Ex ${el_data.anomalyLevel}. ${el_data.anomalyAfflicted}</strong>`;
      el_name.innerHTML = `${el_name.innerHTML}${ex_html}`;
    }

    // 몬스터 추가 코멘트 작업
    if (el_data.comment) {
      let co_html = `<br><strong style='color:#28a745;'>${el_data.comment}</strong>`;
      el_name.innerHTML = `${el_name.innerHTML}${co_html}`;
    }

    /**
     * 특효정보에 따라 별 혹은 X 이미지 HTML을 리턴한다.
     * @param {String} anti_value 특효정보
     * @return {String}
     */
    function starImgHtml(anti_value) {
      return anti_value === "true" ? common.star.one : common.star.zero;
    }

    /**
     * 특효정보에 따라 ⭐❌ 이모지 리턴
     * @param {String} anti_value 특효정보
     * @return {String}
     */
    function starEmoji(anti_value) {
      return anti_value === "true" ? "⭐" : "❌";
    }
    /**
     * 특효정보에 따라 ❌⭐🌠✨ 이모지 리턴
     * @param {Number} value 속통룡주 관련 정보
     * @return {String}
     */
    function starEmoji2(value) {
      let result = "❌";
      switch (value) {
        case 1:
        case "1":
          result = "⭐";
          break;
        case 2:
        case "2":
          result = "🌠";
          break;
        case 3:
        case "3":
          result = "✨";
          break;
      }
      return result;
    }

    // 특효정보 td 내용
    if (JSON.parse(el_data.antiSmall)) {
      new_anti_td = anti_td.cloneNode();
      element.append(new_anti_td);
    } else {
      let anti_array = [];
      anti_array[0] = "공:" + starEmoji(el_data.antiAerial);
      anti_array[1] = "룡:" + starEmoji(el_data.antiDragon);
      anti_array[2] = "류:" + starEmoji(el_data.antiAquatic);
      anti_array[3] = "수:" + starEmoji(el_data.antiFranged);

      let html1 = `${el_data.element}:${starEmoji2(el_data.elembane)}`;
      let html2 = anti_array.join("<br>");

      new_anti_td = anti_td.cloneNode();
      new_anti_td.innerHTML = `${html1}<hr style="margin:0px">${html2}`;

      element.append(new_anti_td, element.querySelector("td.parts"));
    }
  }
})();
