console.log("Welcome to my To-Do List App");

const container = document.querySelector(".todo-body");
const list = document.querySelector(".list");
const body = document.body;
const newTask = document.querySelector(".new-task");
const icon = container.querySelectorAll("i");
let clickCount = 0;
let bodyBackgroundColor = window.getComputedStyle(document.body).backgroundColor;

const initializeTask = () => {
    clickCount++;
    newTask.innerHTML = `<input type="text" class="task-info" placeholder="Enter your task"><button class="submit" type="submit">Add</button>`;
    const submitBtn = document.querySelector(".submit");

    submitBtn.addEventListener("click", () => {
        const taskInfo = document.querySelector(".task-info");
        const element = document.createElement("li");
        element.innerHTML = `<li class="list-item"><div><i class="fa-regular fa-circle fa-xl check"></i>
<p class="content">${taskInfo.value}</p> 
 </div><i class="fa-solid fa-xmark cross" onclick="deleteItem(event)"></i>
 </li><hr>`;
        list.appendChild(element);
        newTask.innerHTML =
            '<i class="fa-solid fa-plus fa-xl" onclick="initializeTask()"></i><input type="text" class="task-info" placeholder="Enter your task"><button class="submit" type="submit">Add</button>'; // Update to include input field and button again
    });
};

list.addEventListener("click", (event) => {
  const check = event.target.closest(".check");
  if (check) {
    const content = check.nextElementSibling;
    check.className = check.classList.contains("fa-circle")
      ? "fa-regular fa-circle-check fa-xl check"
      : "fa-regular fa-circle fa-xl check";
    content.classList.toggle("checked");
  }
});

const mode = document.querySelector(".dark-mode");
mode.addEventListener("click", () => {
    mode.className = mode.classList.contains("fa-moon")
        ? "fa-regular fa-sun fa-xl dark-mode"
        : "fa-regular fa-moon fa-xl dark-mode";
    bodyBackgroundColor === "rgb(255, 255, 255)" ? darkMode() : whiteMode();
});

const darkMode = () => {
  console.log("Dark mode");
  bodyBackgroundColor = "#162029";
  body.style.backgroundColor = bodyBackgroundColor;
  document.body.style.color = "#fff";
  container.style.backgroundColor = "#333e4a";
  
  // Set font color for list items and input fields
  const listItems = document.querySelectorAll('.list-item p');
  const inputField = document.querySelector('.new-task input');
  listItems.forEach(item => {
      item.style.color = '#fff';
  });
  inputField.style.color = '#fff';
};

const whiteMode = () => {
  console.log("White mode");
  bodyBackgroundColor = "rgb(255, 255, 255)";
  body.style.backgroundColor = bodyBackgroundColor;
  document.body.style.color = "#000";
  container.style.backgroundColor = "#f2f2f2";
  
  // Set font color for list items and input fields
  const listItems = document.querySelectorAll('.list-item p');
  const inputField = document.querySelector('.new-task input');
  listItems.forEach(item => {
      item.style.color = '#000';
  });
  inputField.style.color = '#000';
};


const deleteItem = (event) => {
  const del = event.target.closest(".cross");
  const parent = del.parentNode;
  parent.classList.toggle("task-done");
};



// Function to update the date and time
const updateDateTime = () => {
    const dateTimeElement = document.getElementById('datetime');
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
    dateTimeElement.textContent = `${formattedDate} ${formattedTime}`;

  };


// Update the date and time every second
setInterval(updateDateTime, 1000);

// Initialize the date and time immediately on page load
updateDateTime();

// Set default mode to dark mode on page load
darkMode();
