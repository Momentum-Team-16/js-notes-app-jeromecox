const todoForm = document.querySelector("#todoForm");
let inputTitle = document.querySelector("#inputTitle");
let inputBody = document.querySelector("#inputBody");
const todoList = document.querySelector("#todoList");
const url = "http://localhost:3000/notes/";

getRequest();

function makeCard(object) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.dataset.number = object.id;

  let title = document.createElement("div");
  title.classList.add("subCard");
  let titleText = object.title;
  title.innerText = `${titleText}`;

  let todoBody = document.createElement("div");
  todoBody.classList.add("subCard");
  let bodyText = object.body;
  todoBody.innerText = `${bodyText}`;

  let editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.innerText = "✍️";

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerText = "X";

  card.appendChild(title);
  card.appendChild(todoBody);
  card.appendChild(editBtn);
  card.appendChild(deleteBtn);

  todoList.appendChild(card);

  // editBtn.addEventListener("click", (event) => {
  //   editRequest();
  // });

  deleteBtn.addEventListener("click", (event) => {
    todoList.replaceChildren();
    deleteRequest(card);
    getRequest();
  });
}

function getRequest() {
  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      for (let object of data) {
        makeCard(object);
      }
    });
}

function postRequest() {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: `${inputTitle.value}`,
      body: `${inputBody.value}`,
    }),
  }).then((response) => response.json());
}

// function editRequest() {
//   fetch(url, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ title: "", body: "" }),
//   })
//     .then((response) => response.json())
//     .then((data) => {});
// }

function deleteRequest(card) {
  let urlNew = url + card.dataset.number;
  console.log(urlNew);
  fetch(urlNew, {
    method: "DELETE",
  })
    // .then(todoList.replaceChildren())
    .then((response) => response.json());
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  console.log(inputTitle.value);
  console.log(inputBody.value);

  todoList.replaceChildren();

  postRequest();

  getRequest();
  todoForm.reset();
});
