/**
 * 몬스터 검색 확장
 */


/**
 * 이름 검색 기능을 확장한다
 * 
 * 기존 인벤에서 걸려있는 이벤트도 같이 처리되서
 * 키워드에 대해서만 보여줄지 여부를 처리하면 된다
 */
 (function(){
    function getKeywords() {
        return common.form.querySelector("input[name='name']").value.split("/");
    }

    function getName(keyword) {
        return keyword.match(/^([가-힣]+)/g);
    }

    function getInclude(keyword) {
        return Array.from(keyword.matchAll(/@([가-힣]+)/g), x=>x[1]);
    }

    function getExclude(keyword) {
        let excludes = Array.from(keyword.matchAll(/!([가-힣]+)/g), x=>x[1]);
        let excludeApex = common.form.querySelector("input#excludeApex").checked;
        if(excludeApex && !(excludes.includes("주인"))){
            excludes.push("주인");
        }
        return excludes;
    }

    function find_monsters(name) {
        return common.table.body.querySelectorAll(`tr[data-name*="${name}"]`);
    }

    // 이름 검색 폼이 전송될때 이벤트 처리
    function submitEvent(e) {
        let keywords = getKeywords();
    
        for(let keyword of keywords) {
            let name = getName(keyword);
            let includes = getInclude(keyword);
            let excludes = getExclude(keyword);
            
            for(let target of find_monsters(name)) {
                let display = includes.length == 0 ? true : false;
    
                for(let include of includes) {
                    if(target.dataset.name.includes(include)) {
                        display = true;
                    }
                }
                
                for(let exclude of excludes) {
                    if(target.dataset.name.includes(exclude)) {
                        display = false;
                    }
                }

                target.style.display = display ? "table-row" : "none";
            };
        }
    }
    
    // 검색창 전송 이벤트 연결
    common.form.addEventListener("submit", submitEvent);    
})();