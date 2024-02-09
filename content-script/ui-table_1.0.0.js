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
  // common.table.head
  // .querySelector("tr")
  // .append(anti_th, common.table.head.querySelector("th.parts"));
  common.table.head
    .querySelector("tr")
    .append(anti_th);

  // // thead에 search tr 추가
  // let search_tr = document.createElement("tr");
  // let blank_td = document.createElement("td");

  // let name_td = blank_td.cloneNode();
  // name_td.innerHTML = `<input type="text" name="search_name" style="width:90%">`;

  // let anti_td = blank_td.cloneNode();
  // anti_td.innerHTML =
  //   `<select name="search_anti" style="width:90%">` +
  //   `<option value="">-</option>` +
  //   `<optgroup label="속통룡">` +
  //   `<option value="화">화✨</option>` +
  //   `<option value="수">수✨</option>` +
  //   `<option value="뇌">뇌✨</option>` +
  //   `<option value="빙">빙✨</option>` +
  //   `<option value="용">용✨</option>` +
  //   `</optgroup>` +
  //   `<optgroup label="용특효">` +
  //   `<option value="aerial">공</option>` +
  //   `<option value="dragon">룡</option>` +
  //   `<option value="aquatic">류</option>` +
  //   `<option value="franged">수</option>` +
  //   `</optgroup>` +
  //   `</select>`;

  // // tr에 td 추가
  // search_tr.append(blank_td.cloneNode()); // 아이콘
  // search_tr.append(name_td); // 이름
  // search_tr.append(blank_td.cloneNode()); // 종별
  // search_tr.append(blank_td.cloneNode()); // 약점부위
  // search_tr.append(blank_td.cloneNode()); // 유효속성
  // search_tr.append(blank_td.cloneNode()); // 상태이상
  // search_tr.append(anti_td); // 특효
  // search_tr.append(blank_td.cloneNode()); // 파괴부위
  // // thead에 tr 추가
  // common.table.head.append(search_tr);
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

    // 괴이화 레벨/소재 추가
    if (Number(el_data.anomalyLevel)) {
      let ex_html = `<br><strong style='color:#dc3545;'>Ex ${el_data.anomalyLevel}</strong>`;
      el_name.innerHTML = `${el_name.innerHTML}${ex_html}`;
    }

    // 괴이화 소재 추가
    if (el_data.anomalyAfflicted) {
      let ex_level = Number(el_data.anomalyLevel);
      let i = ex_level < 5 ? 0 : 3;
      let color = ['#ff5687', '#c56520', '#ff4c17', '#9fccff', '#486eff', '#a43597'];
      let ex_html = [];
      el_data.anomalyAfflicted.split("/").forEach((value, index) => {
        ex_html.push(`<strong style='color:${color[index+i]};'>${value}</strong>`);
      });
      el_name.innerHTML = `${el_name.innerHTML}<br>${ex_html.join('/')}`;
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
     * 특효정보에 따라 ❌🟡⚠️⭐🌟✨🌠 이모지 리턴
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
          result = "⭐🌟";
          break;
        case 3:
        case "3":
          result = "⭐🌟✨";
          break;
      }
      return result;
    }

    // 특효정보 td 내용
    if (JSON.parse(el_data.antiSmall)) {
      new_anti_td = anti_td.cloneNode();
      element.append(new_anti_td);
    } else {
      // 속성정보
      let elements = el_data.element.split(",");
      let elembanes = el_data.elembane.split(",").map(e=>starEmoji2(e));

      let html1 = '';
      elements.forEach((element, index) => {
        html1 += `${element}:${elembanes[index]}<br>`;
      });

      // 특효주
      let anti_array = [];
      anti_array[0] = "공:" + starEmoji(el_data.antiAerial);
      anti_array[1] = "룡:" + starEmoji(el_data.antiDragon);
      anti_array[2] = "류:" + starEmoji(el_data.antiAquatic);
      anti_array[3] = "수:" + starEmoji(el_data.antiFranged);

      let html2 = anti_array.join("<br>");

      // td 추가
      new_anti_td = anti_td.cloneNode();
      new_anti_td.innerHTML = `${html1}<hr style="margin:0px">${html2}`;

      // element.append(new_anti_td, element.querySelector("td.parts"));
      element.append(new_anti_td);
    }
  }
})();
