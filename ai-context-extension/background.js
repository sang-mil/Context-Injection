chrome.runtime.onInstalled.addListener(() => {

chrome.contextMenus.create({
    id: "save-context",
    title: "AI 맥락 저장",
    contexts: ["selection"]
})

})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {

if(info.menuItemId === "save-context"){

const selectedText = info.selectionText

const data = await chrome.storage.local.get("contexts")

let contexts = data.contexts || []

contexts.push({
    text: selectedText,
    source: tab.url,
    date: new Date().toISOString()
})

chrome.storage.local.set({contexts})

}

})