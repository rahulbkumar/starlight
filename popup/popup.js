const tasks = []

const startTimerBtn = document.getElementById("start-timer-btn")
startTimerBtn.addEventListener("click", () => {
    chrome.storage.local.get(["isRunning"], (res) => {
        chrome.storage.local.set({
            isRunning: !res.isRunning,
        }, () => {
            startTimerBtn.textContent = !res.isRunning ? "Pause Timer" : "Start Timer"
         })
    })
})

const resetTimerBtn = document.getElementById("reset-timer-btn")
resetTimerBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        timer: 0,
        isRunning: false,
    }, () => {
        startTimerBtn.textContent = "Start timer"
    })
})

const addTaskBtn = document.getElementById("add-task-btn")
addTaskBtn.addEventListener("click", () => addTask())

chrome.storage.sync.get(["tasks"], (res) => {
    tasks = res.tasks ? res.tasks : []
    renderTasks()
})

function saveTasks() {
    chrome.storage.sync.set({
        tasks: tasks,
    })
}

function renderTasks(taskNum) {

    const taskRow = document.createElement("div")

    const text = document.createElement("input")
    text.type = "text"
    text.placeholder = "Enter a task..."
    text.value = tasks[taskNum]
    text.addEventListener("change", () => {
        tasks[taskNum] = text.value
        saveTasks()
    })

    const deleteBtn = document.createElement("input")
    deleteBtn.type = "button"
    deleteBtn.value = "X"
    deleteBtn.addEventListener("click", () => {
        deleteTask(taskNum)
    })

    taskRow.appendChild(text)
    taskRow.appendChild(deleteBtn)

    const taskContainer = document.getElementById("task-container")
    taskContainer.appendChild(taskRow)

}

function addTask() {
    const taskNum = tasks.length
    tasks.push("")
    renderTasks(taskNum)
    saveTasks()
}

function deleteTask(taskNum) {
    tasks.splice(taskNum,1)
    renderTasks()
    saveTasks()
}

function renderTasks() {
    const taskContainer = document.getElementById("task-container")
    taskContainer.textContent = ""
    tasks.forEach((taskText, taskNum) => {
        renderTasks(taskNum)

    })
}