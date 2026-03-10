function findInputBox() {

let input = document.querySelector("textarea")

if (input) return input

input = document.querySelector('[contenteditable="true"]')

if (input) return input

return null

}

function createInjectButton(input){

const btn = document.createElement("button")

btn.innerText = "⚡ 맥락 주입"

btn.style.marginTop = "8px"
btn.style.padding = "6px"

input.parentNode.appendChild(btn)

btn.onclick = injectContext

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

const input = findInputBox()

if(input){

createInjectButton(input)

}else{

setTimeout(init,1000)

}

}

init()
