/**
 * 몬스터 검색 확장
 */

/**
 * 이름 검색 기능을 확장
 */
(function () {
  function getKeywords() {
    return common.form.querySelector("input[name='name']").value.split("/");
  }

  function getName(keyword) {
    return keyword.match(/^([가-힣]+)/g);
  }

  function getInclude(keyword) {
    return Array.from(keyword.matchAll(/@([가-힣]+)/g), (x) => x[1]);
  }

  function getExclude(keyword) {
    return Array.from(keyword.matchAll(/!([가-힣]+)/g), (x) => x[1]);
  }

  function find_monsters(name) {
    return common.table.body.querySelectorAll(`tr[data-name*="${name}"]`);
  }

  // 이름 검색 폼이 전송될때 이벤트 처리
  function submitEvent(e) {
    let keywords = getKeywords();

    for (let keyword of keywords) {
      let name = getName(keyword);
      let includes = getInclude(keyword);
      let excludes = getExclude(keyword);
      let excludeApex = common.options.excludeApex;

      for (let target of find_monsters(name)) {
        let display = includes.length == 0 ? true : false;

        for (let include of includes) {
          if (target.dataset.name.includes(include)) {
            display = true;
          }
        }

        for (let exclude of excludes) {
          if (target.dataset.name.includes(exclude)) {
            display = false;
          }
        }

        if (excludeApex && common.func.checkApexElement(target)) {
          display = false;
        }
        target.style.display = display ? "table-row" : "none";
      }
    }
    // 검색폼이 viewport에 들어오도록
    common.form.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
  }

  // 검색창 전송 이벤트 연결
  common.form.addEventListener("submit", submitEvent);
})();

/**
 * 괴이검색 기능 이벤트 추가
 */
(function () {
  // 몬스터 괴이 레벨로 검색
  function find_ex_level(e) {
    let excludeApex = common.options.excludeApex;
    for (let el of common.table.body.querySelectorAll("tr")) {
      let display = el.dataset.anomalyLevel == e.target.value ? true : false;
      if (excludeApex && common.func.checkApexElement(el)) {
        display = false;
      }
      el.style.display = display ? "table-row" : "none";
    }
    // 검색폼이 viewport에 들어오도록
    common.form.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
  }
  for (let btn of common.form.querySelectorAll(".anomaly-legend-btn")) {
    btn.addEventListener("click", find_ex_level);
  }

  // 몬스터 괴이 재료로 검색
  function find_ex_value(e) {
    let excludeApex = common.options.excludeApex;
    for (let el of common.table.body.querySelectorAll("tr")) {
      let display = el.dataset.anomalyAfflicted.split(",").includes(e.target.value) ? true : false;
      if (excludeApex && common.func.checkApexElement(el)) {
        display = false;
      }
      el.style.display = display ? "table-row" : "none";
    }
    // 검색폼이 viewport에 들어오도록
    common.form.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
  }
  for (let btn of common.form.querySelectorAll(".anomaly-afflicted-btn")) {
    btn.addEventListener("click", find_ex_value);
  }
})();

chrome.runtime.sendMessage({ msg: "script-complete" });
