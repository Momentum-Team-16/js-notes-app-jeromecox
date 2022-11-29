const todoForm = document.querySelector("#todoForm");
let inputTitle = document.querySelector("#inputTitle");
let inputBody = document.querySelector("#inputBody");
const todoList = document.querySelector("#todoList");
const url = "http://localhost:3000/notes/";

getRequest();

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (inputTitle.value === "") {
    inputTitle.setCustomValidity("Please enter a task category.");
    inputTitle.reportValidity();
  } else if (inputBody.value === "") {
    inputBody.setCustomValidity("Please enter a task.");
    inputBody.reportValidity();
  } else {
    console.log(inputTitle.value);
    console.log(inputBody.value);

    postRequest();

    todoForm.reset();
  }
});

function createEl(type, classArray, parent) {
  let newElement = document.createElement(type);
  newElement.classList.add(...classArray);
  if (parent) parent.appendChild(newElement);
  return newElement;
}

function makeCard(object) {
  let card = createEl("div", ["card"], todoList);
  card.id = object.id;
  card.dataset.number = object.id;

  let title = createEl("div", ["subCard", "title"], card);
  title.id = "title" + object.id;
  let titleText = object.title;
  title.innerText = `${titleText}`;

  let todoBody = createEl("div", ["subCard", "body"], card);
  todoBody.id = "body" + object.id;
  let bodyText = object.body;
  todoBody.innerText = `${bodyText}`;

  let editBtn = createEl("button", ["edit-btn"], card);
  editBtn.innerText = "✍️";

  let saveBtn = createEl("button", ["save-btn"], false);
  saveBtn.innerText = "💾";

  let deleteBtn = createEl("button", ["delete-btn"], card);
  deleteBtn.innerText = "X";

  editBtn.addEventListener("click", (event) => {
    title.contentEditable = true;
    todoBody.contentEditable = true;
    card.replaceChild(saveBtn, editBtn);
  });

  saveBtn.addEventListener("click", (event) => {
    title.contentEditable = false;
    todoBody.contentEditable = false;
    card.replaceChild(editBtn, saveBtn);
    editRequest(card);
  });

  deleteBtn.addEventListener("click", (event) => {
    deleteRequest(card);
    todoList.removeChild(card);
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
  })
    .then((response) => response.json())
    .then((object) => {
      console.log(object);
      makeCard(object);
    });
}

function editRequest(editObj) {
  let urlEdit = url + editObj.id;
  console.log(`URL to edit: ${urlEdit}`);

  let newTitle = editObj.querySelector(".title").innerText;
  console.log(`Updating: ${newTitle}`);
  let newBody = editObj.querySelector(".body").innerText;
  console.log(`Updating: ${newBody}`);

  fetch(urlEdit, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: `${newTitle}`,
      body: `${newBody}`,
    }),
  }).then((response) => response.json());
}

function deleteRequest(delObj) {
  let urlDel = url + delObj.id;
  console.log(`URL to delete: ${urlDel}`);
  fetch(urlDel, {
    method: "DELETE",
  }).then((response) => response.json());
}
