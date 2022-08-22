/**
 * 몬스터 검색 폼 ui 추가
 */

/**
 * 검색창 옵션 tr
 */
(function () {
  // td를 만든다.
  let option_td = document.createElement("td");
  option_td.id = "options";

  // th 만들기
  let option_th = document.createElement("th");
  option_th.innerText = "옵션";

  // tr 만들고 th, td 추가
  let option_tr = document.createElement("tr");
  option_tr.append(option_th, option_td);

  // tr을 테이블에 추가.
  let searchBody = common.form.querySelector("tbody");
  searchBody.append(option_tr);
})();

/**
 * 검색창 옵션 내용
 */
(function () {
  // checkbox
  let exclude_check = document.createElement("input");
  exclude_check.id = "excludeApex";
  exclude_check.type = "checkbox";
  chrome.storage.sync.get("excludeApex", (items) => {
    exclude_check.checked = items.excludeApex;
  });
  exclude_check.addEventListener("change", (e) => {
    common.options.excludeApex = e.target.checked;
    if (common.form.querySelector("input[name='name']").value !== "") {
      common.form.dispatchEvent(new Event("submit"));
    }
  });

  // label
  let exclude_label = document.createElement("label");
  exclude_label.append(exclude_check, "주인제외");

  // 추가.
  let option_td = common.form.querySelector("td#options");
  option_td.append(exclude_label);
})();

/**
 * 검색창 괴이검색 tr
 */
(function () {
  // td를 만든다.
  let extra_td = document.createElement("td");
  extra_td.id = "extra";
  extra_td.style.display = "flex";

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

/**
 * 검색창 괴이검색 내용
 */
(function () {
  // 필드셋 공통 설정
  let fieldset = document.createElement("fieldset");
  fieldset.style.display = "inline-block";
  fieldset.style.marginRight = "5px";
  fieldset.style.marginBottom = "5px";
  fieldset.style.padding = "5px";
  fieldset.style.border = "1px solid #dc3545";
  fieldset.style.borderRadius = "5px";

  // 레전드 공통 설정
  let legend = document.createElement("legend");
  legend.style.padding = "0px 3px";

  // 레전드 버튼 공통 설정
  let l_btn = document.createElement("button");
  l_btn.type = "button";
  l_btn.className = "anomaly-legend-btn";
  l_btn.style.minWidth = "40px";
  l_btn.style.border = "1px solid #dc3545";
  l_btn.style.borderRadius = "5px";
  l_btn.style.backgroundColor = "#fff";
  l_btn.style.color = "#dc3545";

  // 소재 버튼 공통 설정
  let a_btn = document.createElement("button");
  a_btn.type = "button";
  a_btn.className = "anomaly-afflicted-btn";
  a_btn.style.minWidth = "40px";
  a_btn.style.margin = "1px 3px";
  a_btn.style.border = "1px solid #cc3333";
  a_btn.style.borderRadius = "5px";
  a_btn.style.backgroundColor = "#cc3333";
  a_btn.style.color = "#fff";

  // 괴이화 소재 검색 옵션을 td에 추가한다
  let extra_td = common.form.querySelector("td#extra");
  let extras = [
    [""],
    ["뼈/견골", "가죽/가죽+"],
    ["용골/견룡골", "피/깨끗한피"],
    ["비늘/비늘+", "갑각/견갑각"],
    ["이빨/이빨+", "발톱/첨예발톱"],
    ["흉뿔", "흉뼈", "흉비늘"],
  ];

  for (let index = 0; index < extras.length; index++) {
    let new_fieldset = fieldset.cloneNode();

    let new_legend = legend.cloneNode();
    new_fieldset.append(new_legend);

    let new_btn = l_btn.cloneNode();
    new_btn.innerText = `Ex${index}`;
    new_btn.value = index;
    new_legend.append(new_btn);

    for (let extra of extras[index]) {
      let new_btn = a_btn.cloneNode();
      new_btn.value = extra;
      new_btn.innerText = extra ? extra : "없음";
      new_fieldset.append(new_btn);
      new_fieldset.append(document.createElement("br"));
    }

    extra_td.append(new_fieldset);
  }
})();
