const invenUrl = "https://mhf.inven.co.kr/dataninfo/mhr/monster/";

/**
 * 확장 프로그램 아이콘이 클릭되었을 때
 *
 * * 몬스터 리스트 페이지가 아닐 경우에만 해당 페이지로 이동합니다.
 * * 쿼리스트링(?), 해시(#) 등이 포함된 경우에도 불필요한 재이동/재로드를 방지합니다.
 * ! popup이 설정되면 동작하지 않습니다.
 */
chrome.action.onClicked.addListener((tab) => {
  if (!tab || !tab.url || !tab.url.startsWith(invenUrl)) {
    chrome.tabs.update(tab.id, { url: invenUrl });
  }
});

/**
 * onMessage 리스너
 *
 * * content-script에서 처리 완료(script-complete) 메시지 수신 시 뱃지 활성화 및 배경색 지정
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request && request.msg === "script-complete") {
    if (sender && sender.tab && typeof sender.tab.id === "number") {
      chrome.action.setBadgeText({ tabId: sender.tab.id, text: "ON" });
      chrome.action.setBadgeBackgroundColor({
        tabId: sender.tab.id,
        color: "#be123c",
      });
    }
  }
});

