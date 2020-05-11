// Define are UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load all event listener
loadEventlisters();

function loadEventlisters() {
  //add task event
  form.addEventListener("submit", addTask);
  // remove task event
  taskList.addEventListener("click", removeTask);
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
  //clear inout
  taskInput.value = " ";
  e.preventDefault();
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
  }
}
