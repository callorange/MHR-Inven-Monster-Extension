/**
 * 몬스터 검색 폼 ui 추가
 */

/**
 * 검색창 괴이 검색 버튼 추가
 */
(function () {
  // 필드셋 공통 설정
  let fieldset = document.createElement("fieldset");
  fieldset.style.display = "inline-block";
  fieldset.style.marginRight = "15px";
  fieldset.style.padding = "5px";
  fieldset.style.border = "1px solid #dc3545";
  fieldset.style.borderRadius = "5px";

  // 레전드 공통 설정
  let legend = document.createElement("legend");
  legend.style.padding = "0px 3px";

  // 레전드 버튼 공통 설정
  let l_btn = document.createElement("button");
  l_btn.type = "button";
  l_btn.class = "ex-legend-btn";
  l_btn.style.minWidth = "50px";
  l_btn.style.border = "1px solid #dc3545";
  l_btn.style.borderRadius = "5px";
  l_btn.style.backgroundColor = "#fff";
  l_btn.style.color = "#dc3545";

  // 소재 버튼 공통 설정
  let e_btn = document.createElement("button");
  e_btn.type = "button";
  e_btn.class = "ex-value-btn";
  e_btn.style.minWidth = "50px";
  e_btn.style.margin = "0px 3px";
  e_btn.style.border = "1px solid #cc3333";
  e_btn.style.borderRadius = "5px";
  e_btn.style.backgroundColor = "#cc3333";
  e_btn.style.color = "#fff";

  // td를 만든다.
  let extra_td = document.createElement("td");

  // 괴이화 소재 검색 옵션을 td에 추가한다
  let extras = [
    ["없음"],
    ["뼈", "가죽"],
    ["용골", "피"],
    ["비늘", "갑각"],
    ["발톱", "이빨"],
  ];

  for (let index = 0; index < extras.length; index++) {
    let new_fieldset = fieldset.cloneNode();

    let new_legend = legend.cloneNode();
    new_fieldset.append(new_legend);

    let new_btn = l_btn.cloneNode();
    new_btn.innerText = `Ex${index}`;
    // new_btn.addEventListener("click", function(){find_monster_ex_level(index);});
    new_btn.value = index;
    new_legend.append(new_btn);

    for (let extra of extras[index]) {
      let new_btn = e_btn.cloneNode();
      new_btn.innerText = extra;
      // new_btn.addEventListener("click", function(){find_monster_ex_value(extra);});
      new_btn.value = extra;
      new_fieldset.append(new_btn);
    }

    extra_td.append(new_fieldset);
  }

  // th 만들기
  let extra_th = document.createElement("th");
  extra_th.innerText = "괴이소재";

  // tr 만들고 th, td 추가
  let extra_tr = document.createElement("tr");
  extra_tr.append(extra_th, extra_td);

  // tr을 테이블에 추가.
  let searchBody = common.form.querySelector("tbody");
  searchBody.append(extra_tr);
})();
