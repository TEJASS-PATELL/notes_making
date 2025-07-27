const notescontainer = document.querySelector(".notescontainer");
let notes = document.querySelectorAll(".input");
const createbtn = document.querySelector(".btn");

// Load saved notes from localStorage
function show() {
    notescontainer.innerHTML = localStorage.getItem("notes") || "";
}
show();

// Update localStorage when notes change
function updatestorage() {
    localStorage.setItem("notes", notescontainer.innerHTML);
}

// Create new editable note
createbtn.addEventListener("click", function () {
    let inputbox = document.createElement("p");
    let img = document.createElement("img");

    inputbox.className = "input";
    inputbox.setAttribute("contenteditable", "true");

    img.src = "delete.png";
    img.className = "delete-icon"; // optional: for styling

    // Add the editable note and delete icon
    inputbox.appendChild(img);
    notescontainer.appendChild(inputbox);

    updatestorage(); // save after adding
});

// Listen for clicks (delete or focus)
notescontainer.addEventListener("click", function (e) {
    if (e.target.tagName === 'IMG') {
        // Delete the note
        e.target.parentElement.remove();
        updatestorage();
    } else if (e.target.tagName === 'P') {
        // If a note is clicked, add keyup listener
        notes = document.querySelectorAll(".input");
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updatestorage();
            }
        });
    }
});

// Handle Enter key — don't create new paragraph
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak"); // keep line break inside <p>
        event.preventDefault(); // prevent new <div> or <p>
    }
});
