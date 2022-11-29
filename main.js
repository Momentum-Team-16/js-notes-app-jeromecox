const todoForm = document.querySelector("#todoForm");
let inputTitle = document.querySelector("#inputTitle");
let inputBody = document.querySelector("#inputBody");
const todoList = document.querySelector("#todoList");
const url = "http://localhost:3000/notes/";

getRequest();

function createEl(type, classArray, parent) {
  let newElement = document.createElement(type);
  newElement.classList.add(...classArray);
  parent.appendChild(newElement);
  return newElement;
}

function makeCard(object) {
  let card = createEl("div", ["card"], todoList);
  card.dataset.number = object.id;

  let title = createEl("div", ["subCard"], card);
  let titleText = object.title;
  title.innerText = `${titleText}`;

  let todoBody = createEl("div", ["subCard"], card);
  let bodyText = object.body;
  todoBody.innerText = `${bodyText}`;

  let editBtn = createEl("button", ["edit-btn"], card);
  editBtn.innerText = "✍️";

  let deleteBtn = createEl("button", ["delete-btn"], card);
  deleteBtn.innerText = "X";

  // editBtn.addEventListener("click", (event) => {
  //   todoList.replaceChildren();
  //   editRequest(card);
  //   getRequest();
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

function editRequest(editObj) {
  let urlEdit = url + editObj.dataset.number;
  fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "", body: "" }),
  })
    .then((response) => response.json())
    .then((data) => {});
}

function deleteRequest(delObj) {
  let urlDel = url + delObj.dataset.number;
  console.log(`URL to delete: ${urlDel}`);
  fetch(urlDel, {
    method: "DELETE",
  }).then((response) => response.json());
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
