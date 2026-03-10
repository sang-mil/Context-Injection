document.getElementById("save").onclick = () => {

const title = document.getElementById("title").value
const context = document.getElementById("context").value

chrome.storage.local.set({
    project_title: title,
    project_context: context
})

alert("Saved")

}

async function loadContexts(){

const data = await chrome.storage.local.get("contexts")

const list = document.getElementById("contextList")

list.innerHTML = ""

const contexts = data.contexts || []

contexts.forEach((c,i)=>{

const item = document.createElement("div")

item.style.padding = "8px"
item.style.margin = "4px 0"
item.style.backgroundColor = "#f0f0f0"
item.style.borderRadius = "4px"
item.style.cursor = "pointer"
item.style.fontSize = "12px"

const text = document.createElement("p")
text.innerText = c.text.slice(0,80)
text.style.margin = "4px 0"

const meta = document.createElement("small")
meta.innerText = `${new Date(c.date).toLocaleDateString()} - ${new URL(c.source).hostname}`
meta.style.color = "#666"

item.appendChild(text)
item.appendChild(meta)

item.onclick = ()=> injectContext(c.text)

list.appendChild(item)

})

}

function injectContext(text){

chrome.tabs.query({active:true,currentWindow:true},tabs=>{

chrome.tabs.sendMessage(tabs[0].id,{
    action:"injectContext",
    text:text
})

})

}

loadContexts()

