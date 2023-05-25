class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
class UI {
  //Method to add book in ui
  addBookToList(book) {
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
  }

  //show msg when book added and when book deleted
  showAlert(msg, className) {
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
  }

  //clear fields when book has been added
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  //if user want to delete, then delete book
  deleteBook(target) {
    if (target.className == "delete") {
      target.parentElement.parentElement.remove();
      return true;
    }
    return false;
  }
}

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

    //Add to local storage
    addBook();

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
  if (ui.deleteBook(e.target)) {
    ui.showAlert("Book is removed from the list", "success");
  }

  //also delete from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  e.preventDefault();
});
//Add books to local storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      let books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
    books.forEach(function (book) {
      const ui = new UI();
      //add book to ui
      ui.addBookToList(book);
    });
  }
  static addBook() {
    const books = Store.getBooks();
    books.push("book");
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(iabn) {
    const books = Store.getBooks();
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        book.splice(index, 1);
      }
    });
    localStorage.setItem;
    "books", JSON.stringify(books);
  }
}

//DOM load event (when we refresh page, still books are there i.e. from local storage);
document.addEventListener("DOMContentLoaded", Store.displayBooks);
