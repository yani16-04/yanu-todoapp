let tasks = [];

function addTask() {
  let text = document.getElementById("task-input").value;
  let date = document.getElementById("task-date").value;
  let time = document.getElementById("task-time").value;

  if (text === "") {
    alert("Enter task!");
    return;
  }

  let task = {
    id: Date.now(),
    text,
    date,
    time
  };

  tasks.push(task);
  displayTasks();
  setAlarm(task);

  document.getElementById("task-input").value = "";
}

function displayTasks() {
  let list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks.forEach(task => {
    let li = document.createElement("li");

    li.innerHTML = `
      <div>
        <span class="task-info">${task.text}</span>
        <small>${task.date || ""} ${task.time || ""}</small>
      </div>

      <div class="task-buttons">
        <button class="edit" onclick="editTask(${task.id})">✏️</button>
        <button class="delete" onclick="deleteTask(${task.id})">🗑️</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  displayTasks();
}

function editTask(id) {
  let task = tasks.find(t => t.id === id);

  let newText = prompt("Edit task:", task.text);
  if (newText !== null) {
    task.text = newText;
    displayTasks();
  }
}

/* 🔔 Alarm */
function setAlarm(task) {
  if (!task.date || !task.time) return;

  let alarmTime = new Date(task.date + " " + task.time).getTime();
  let now = new Date().getTime();

  let timeout = alarmTime - now;

  if (timeout > 0) {
    setTimeout(() => {
      alert("⏰ Reminder: " + task.text);
      playSound();
    }, timeout);
  }
}

/* 🔊 Sound */
function playSound() {
  let audio = new Audio("https://www.soundjay.com/buttons/sounds/beep-01a.mp3");
  audio.play();
}
