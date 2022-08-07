/**
 * Extension이 설치될때
 * 
 * * details: object
 * *  id: string optional
 * *  previousVersion: string optional
 * *  reason: OnInstalledReason
 * *      "install"
 * *      "update"
 * *      "chrome_update"
 * *      "shared_module_update"
 */
chrome.runtime.onInstalled.addListener((details) => {
});


/**
 * 확장 프로그램 아이콘이 클릭 됬을때
 * 
 * * 몬스터 리스트 페이지로 이동한다.
 * ! popup이 설정되면 작동 하지 않는다.
 */
chrome.action.onClicked.addListener((tab) => {
    let url = "https://mhf.inven.co.kr/dataninfo/mhr/monster/";
    if(tab.url != url){
        chrome.tabs.update(tab.id, {url});
    }
});