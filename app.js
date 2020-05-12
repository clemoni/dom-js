// Define are UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load all event listener
loadEventlisters();

function loadEventlisters() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", updatePreviousTasks);
  //add task event
  form.addEventListener("submit", addTask);
  // remove task event
  taskList.addEventListener("click", removeTask);
  // cleat taks event
  clearBtn.addEventListener("click", clearTasks);
  //filter
  filter.addEventListener("keyup", filterTasks);
}
function updatePreviousTasks() {
  let tasks;
  if (localStorage.getItem("tasks") != null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasks);
    tasks.forEach(function (task) {
      const li = document.createElement("li");
      li.className = "collection-item";
      li.appendChild(document.createTextNode(task));
      const link = document.createElement("a");
      link.className = "delete-item secondary-content ";
      link.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(link);
      taskList.appendChild(li);
    });
  }
}

function addTask(e) {
  if (taskInput.value == "") {
    alert("add a task");
  }
  const li = document.createElement("li");
  //add class
  li.className = "collection-item";
  //create a textnode and happen to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create a new link element
  const link = document.createElement("a");
  link.className = "delete-item secondary-content ";
  //add icon html
  link.innerHTML = '<i class ="fa fa-remove"></i>';
  //append the link to li
  li.appendChild(link);
  //   append the li to the ul
  taskList.appendChild(li);

  // store taks in a local storage
  storeTaskInLocaleStorage(taskInput.value);
  //clear inout
  taskInput.value = " ";
  e.preventDefault();
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  const taskToBeDeleted = taskItem.firstChild.textContent;

  if (localStorage.getItem("tasks") == null) {
    tasks = new Array();
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (task == taskToBeDeleted) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTaskFromLocalStorage() {
  localStorage.removeItem("tasks");
}

// clear all teh li taks
function clearTasks(e) {
  //taskList.innerHTML = " "
  //faster way
  // first test if there is stilla child
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearTaskFromLocalStorage();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  // console.log(document.querySelectorAll(".collection-iten"));
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    // console.log(item);
    //indexOf return number occurrent of two string variables
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function storeTaskInLocaleStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") == null) {
    tasks = new Array();
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updatePreviousTasks() {
  let tasks;
  if (localStorage.getItem("tasks") != null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    // console.log(tasks);
    tasks.forEach(function (task) {
      const li = document.createElement("li");
      li.className = "collection-item";
      li.appendChild(document.createTextNode(task));
      const link = document.createElement("a");
      link.className = "delete-item secondary-content ";
      link.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(link);
      taskList.appendChild(li);
    });
  }
}
