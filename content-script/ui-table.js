/**
 * 몬스터 테이블 ui 추가
 */

/**
 * 몬스터 테이블 레이아웃 수정
 */
(function () {
  common.table.all.tableLayout = "auto";
  common.table.colgroup.innerHTML = `<col width="10%"><col width="*"><col width="5%"><col width="15%"><col width="10%"><col width="11%"><col width="15%"><col width="12%">`;
})();

/**
 * 몬스터 테이블 thead 확장
 */
(function () {
  // th 생성
  let anti_th = document.createElement("th");
  anti_th.innerHTML = "특효";

  // thead에 th 추가
  common.table.head.querySelector("tr").append(anti_th);
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
    if (Number(el_data.exLevel)) {
      let ex_html = `<br><strong style='color:#dc3545;'>Ex${el_data.exLevel}. ${el_data.exValue}</strong>`;
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

    // 특효정보 td 내용
    if (el_data.small === "true") {
      new_anti_td = anti_td.cloneNode();
      element.append(new_anti_td);
    } else {
      let anti_array = [];
      anti_array[0] = "공[공서계]" + starImgHtml(el_data.aerial);
      anti_array[1] = "룡[용특효]" + starImgHtml(el_data.dragon);
      anti_array[2] = "류[수서계]" + starImgHtml(el_data.aquatic);
      anti_array[3] = "수[아수종]" + starImgHtml(el_data.franged);

      new_anti_td = anti_td.cloneNode();
      new_anti_td.innerHTML = `${anti_array.join("<br>")}`;

      element.append(new_anti_td);
    }
  }
})();