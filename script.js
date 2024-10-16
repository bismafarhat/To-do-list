const textinput = document.getElementById("text-input");
const addbutton = document.getElementById("add-button");
const tasklist = document.getElementById("task-list");

let currentEditItem = null;

function addOrEditTask() {
  const taskText = textinput.value.trim(); 
  if (taskText === "") return;

  if (currentEditItem) {
   
    const taskTextSpan = currentEditItem.querySelector(".task-text");
    taskTextSpan.textContent = taskText;

    currentEditItem = null;
  } else {
   
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.dataset.id = Date.now(); 

    const circle = document.createElement("div");
    circle.classList.add("circle");

    const taskTextSpan = document.createElement("span");
    taskTextSpan.classList.add("task-text");
    taskTextSpan.textContent = taskText;

circle.addEventListener("click", () => {
  circle.classList.toggle("completed"); 
  taskTextSpan.classList.toggle("completed"); })

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.textContent = "✎";
    editButton.addEventListener("click", () => {
     
      textinput.value = taskTextSpan.textContent;

      currentEditItem = li;
    });

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    cancelButton.textContent = "✖";
    cancelButton.addEventListener("click", () => {
      tasklist.removeChild(li);

      if (currentEditItem === li) {
        currentEditItem = null;
      }
    });

    li.appendChild(circle);
    li.appendChild(taskTextSpan);
    li.appendChild(editButton);
    li.appendChild(cancelButton);

    tasklist.appendChild(li);
  }

  textinput.value = ""; 
}


addbutton.addEventListener("click", addOrEditTask);


textinput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addOrEditTask();
  }
});
