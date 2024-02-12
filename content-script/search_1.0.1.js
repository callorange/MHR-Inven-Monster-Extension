/**
 * 몬스터 검색 확장
 */

/**
 * 이름 검색 기능을 확장
 */
(function () {
  function getKeywords() {
    return common.form.querySelector("input[name='name']").value.replaceAll(',', '/').split("/").filter((x)=>x.length>0);
  }

  function find_monsters(keyword) {
    let find_options = [];

    if(0 <= keyword.search('!')) {
      keyword = keyword.replaceAll('!', '');
      find_options.push(`:not([data-name*="주인"],[data-name*="희소"],[data-name*="아종"])`);
    }
    
    if(0 <= keyword.search('@')) {
      keyword = keyword.replaceAll('@', '');
      find_options.push(`:is([data-name*="희소"],[data-name*="아종"])`);
    }

    if(0 <= keyword.search('#')) {
      keyword = keyword.replaceAll('#', '');
      find_options.push(`[data-name*="주인"]`);
    }

    for(let name of keyword.split(' ')) {
      find_options.push(`[data-name*="${name}"]`);
    }
  
    return common.table.body.querySelectorAll(`tr${find_options.join('')}`)
  }

  // 이름 검색 폼이 전송될때 이벤트 처리
  // 인벤에서 걸어놓은 기본 검색 이벤트도 수행 된다.
  function submitEvent(e) {
    let keywords = getKeywords();
    if(keywords.length) {
      for (let keyword of keywords) {
        for (let target of find_monsters(keyword)) {
          target.style.display = "table-row";
        }
      }
    } else {
      for (let target of common.table.body.querySelectorAll(`tr`)) {
        target.style.display = "table-row";
      }
    }
    // 검색폼이 viewport에 들어오도록
    common.form.scrollIntoView({behavior: "smooth", block: "nearest", inline: "center"});
  }

  // 검색창 전송 이벤트 연결
  common.form.addEventListener("submit", submitEvent);
})();

chrome.runtime.sendMessage({ msg: "script-complete" });
