/**
 * Extension이 설치될때
 * 
 * details: object
 *  id: string optional
 *  previousVersion: string optional
 *  reason: OnInstalledReason
 *      "install"
 *      "update"
 *      "chrome_update"
 *      "shared_module_update"
 */
chrome.runtime.onInstalled.addListener((details) => {
});