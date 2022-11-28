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
  // 인벤에서 걸어놓은 기본 검색 이벤트도 수행 된다.
  function submitEvent(e) {
    let keywords = getKeywords();

    for (let keyword of keywords) {
      let name = getName(keyword);
      let includes = getInclude(keyword);
      let excludes = getExclude(keyword);

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

        target.style.display = display ? "table-row" : "none";
      }
    }
    // 검색폼이 viewport에 들어오도록
    common.form.scrollIntoView({behavior: "smooth", block: "nearest", inline: "center"});
  }

  // 검색창 전송 이벤트 연결
  common.form.addEventListener("submit", submitEvent);
})();

chrome.runtime.sendMessage({ msg: "script-complete" });
