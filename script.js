//book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//ui constructor
function UI() {}
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  //create tr element
  const row = document.createElement("tr");
  row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
};

//clear all inputs after adding book
UI.prototype.clearFields = () => {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

//show elert when inputs are empty
UI.prototype.showAlert = (msg, className) => {
  //create div
  const div = document.createElement("div");
  //add class name
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(msg));
  //insert div to UI
  //get parent
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  //now insert dic before form
  container.insertBefore(div, form);
  //timeout after 3 seconds
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};

//delete book
UI.prototype.deleteBook = (target) => {
  if (target.className == "delete") {
    target.parentElement.parentElement.remove();
  }
};

//Event listeners for add book
document.getElementById("book-form").addEventListener("submit", (e) => {
  //get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  //instantiating the book

  const book = new Book(title, author, isbn);

  //Instantiate UI object
  const ui = new UI();

  //validation for empty inputs
  if (title == "" || author == "" || isbn == "") {
    ui.showAlert(`Please fill in all fields`, "error");
  } else {
    //add book to list
    ui.addBookToList(book);

    //clear all inputs
    ui.clearFields();

    //show alert when book added
    ui.showAlert("Book is added successfully", "success");
  }

  e.preventDefault();
});

//event listener for delete book
document.querySelector("#book-list").addEventListener("click", (e) => {
  //instantiate UI
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Book is removed from the list", "success");
  e.preventDefault();
});
