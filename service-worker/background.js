const invenUrl = "https://mhf.inven.co.kr/dataninfo/mhr/monster/";

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
  // chrome.storage.sync.clear();
});

/**
 * 확장 프로그램 아이콘이 클릭 됬을때
 *
 * * 몬스터 리스트 페이지로 이동한다.
 * ! popup이 설정되면 작동 하지 않는다.
 */
chrome.action.onClicked.addListener((tab) => {
  if (tab.url != invenUrl) {
    chrome.tabs.update(tab.id, { url: invenUrl });
  }
});

/**
 * onMessage
 *
 * * content-script에서 처리 완료 메시지 수신
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg === "script-complete") {
    chrome.action.setBadgeText({ tabId: sender.tab.id, text: "on" });
  }
});

/**
 * tab.onUpdate
 */
// chrome.tabs.onUpdated.addListener((id, info, tab) => {});
