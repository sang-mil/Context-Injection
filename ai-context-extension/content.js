function findInputBox() {

let input = document.querySelector("textarea")

if (input) return input

input = document.querySelector('[contenteditable="true"]')

if (input) return input

return null

}

function createFloatingButton(){

if(document.getElementById("context-inject-btn")) return

const btn = document.createElement("button")

btn.id = "context-inject-btn"

btn.innerText = "⚡ 맥락 주입"

btn.style.position = "fixed"
btn.style.bottom = "120px"
btn.style.left = "50%"
btn.style.transform = "translateX(-50%)"

btn.style.zIndex = "9999"
btn.style.padding = "10px 16px"
btn.style.borderRadius = "8px"

btn.style.background = "#10a37f"
btn.style.color = "white"
btn.style.border = "none"

btn.style.cursor = "pointer"

btn.onclick = injectContext

document.body.appendChild(btn)

}

async function injectContext(){

const data = await chrome.storage.local.get([
"project_title",
"project_context"
])

const input = findInputBox()

if(!input) return

const prompt =
`[PROJECT CONTEXT]

${data.project_title}

${data.project_context}

[USER QUESTION]

`

input.value = prompt + input.value

}

function init(){

createFloatingButton()

}

init()

chrome.runtime.onMessage.addListener((msg)=>{

if(msg.action === "injectContext"){

const input = document.querySelector("textarea")

if(!input) return

input.value = `[REFERENCE]

${msg.text}

` + input.value

}

})


