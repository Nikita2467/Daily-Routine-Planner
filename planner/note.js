const notesContainer = document.querySelector("#notes-container");
const createButton = document.querySelector("#button");

function showNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        notesContainer.innerHTML = savedNotes;
    } else {
        notesContainer.innerHTML = ""; // Ensure the container is empty if no notes are saved
    }
    addDeleteButtonListeners();
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createButton.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "./images/delete.png";
    img.className = "delete-icon"; // Add class for styling
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    updateStorage();
    addDeleteButtonListeners();
});

function addDeleteButtonListeners() {
    const deleteButtons = document.querySelectorAll(".delete-icon");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            e.target.parentElement.remove();
            updateStorage();
        });
    });
}

notesContainer.addEventListener("input", function(e) {
    if (e.target.classList.contains("input-box")) {
        updateStorage();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
