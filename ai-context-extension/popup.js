document.getElementById("save").onclick = () => {

const title = document.getElementById("title").value
const context = document.getElementById("context").value

chrome.storage.local.set({
    project_title: title,
    project_context: context
})

alert("Saved")

}
