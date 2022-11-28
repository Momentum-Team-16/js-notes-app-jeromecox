const todoForm = document.querySelector("#todoForm");
const todoList = document.querySelector("#todoList");

fetch ("http://localhost:3000/notes/", {
  method: "GET",
  headers: {"Content-Type": "application/json"},
})

function postNote (note) {
  fetch("http://localhost:3000/notes/", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({"title": "Hi", "body": "COOL"})
})
  .then (response => response.json())
  .then (data => )
}

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

}
);
