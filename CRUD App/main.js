const bookName = document.getElementById("bookName");
const bookPrice = document.getElementById("bookPrice");
const bookDescription = document.getElementById("bookDescription");
const bookCategory = document.getElementById("bookCategory");
const tableBody = document.getElementById("tableBody");
const addBtn = document.getElementById("add-btn");
const updateBtn = document.getElementById("update-btn");
const searchInput = document.getElementById("searchInput");

let booksContainer;

checkLocalStorage(); // called first when the program starts to check if there is past info stored or not

function clearForm() {
  bookCategory.value = ``;
  bookDescription.value = ``;
  bookPrice.value = ``;
  bookName.value = ``;
}

function addBook() {
  // creates a new object of type book and append it to the array
  const book = {
    name: bookName.value,
    price: bookPrice.value,
    description: bookDescription.value,
    category: bookCategory.value,
  };
  booksContainer.push(book);
  updateView();
  localStorage.setItem("Books", JSON.stringify(booksContainer));
  clearForm();
}

function getBookInfo(id) {
  // this function brings the book info from the table to the input values so we can update them
  bookName.value = booksContainer[id].name;
  bookPrice.value = booksContainer[id].price;
  bookDescription.value = booksContainer[id].description;
  bookCategory.value = booksContainer[id].category;
  swapButtons(); //
  updateBtn.onclick = function () {
    updateBookInfo(id);
  };
}

function updateBookInfo(id) { // this function updates the book inside the array itself
  booksContainer[id].name = bookName.value;
  booksContainer[id].price = bookPrice.value;
  booksContainer[id].description = bookDescription.value;
  booksContainer[id].category = bookCategory.value;
  localStorage.setItem("Books", JSON.stringify(booksContainer));
  swapButtons();
  updateView();
  clearForm();
}

function deleteBook(id) {
  booksContainer.splice(id, 1); // remove the book with desired id from the array
  localStorage.setItem("Books", JSON.stringify(booksContainer)); // update local storage with the new array so when info are retrieved again they are updated
  updateView();
}

function swapButtons() {   // swaps between add and update buttons
  addBtn.classList.toggle("d-none");
  updateBtn.classList.toggle("d-none");
}

function checkLocalStorage() {
  if (localStorage.getItem("Books") !== null) {
    // local storage contains books, set our array with value stored in local storage
    booksContainer = JSON.parse(localStorage.getItem("Books"));
  } else {
    // local storage is empty, initialize the Books Container as an empty array
    booksContainer = [];
  }
  updateView();
}

function updateView() {
  let htmlContent = ``; // empty string to append all array elements in it
  let id = 0; // counter for the books array
  for (book of booksContainer) {
    // at each book in the array, append book Info inside the string
    htmlContent += `
          <tr>
              <td>${id}</td> 
              <td>${book.name}</td>
              <td>${book.price}</td>
              <td>${book.category}</td>
              <td>${book.description}</td>
              <td> <button class="btn btn-info" onclick = "getBookInfo(${id})">Update</button></td>
              <td> <button class="btn btn-danger" onclick ="deleteBook(${id})" >Delete</button></td>    
          </tr>`;
    // the id of each book is passed inside get Book Info and delete book functions , so when we click on these buttons
    // those functions will be called and the book id are already passed to it , you can see it through inspect from the browser
    id++;
  }
  tableBody.innerHTML = htmlContent;
}

function searchBook() {
  let htmlContent = ``;
  let id = 0;
  for (book of booksContainer) {
    // change all characters to lower case first in the book name and search value
    const bookInArray = book.name.toLowerCase();
    const searchValue = searchInput.value.toLowerCase();
    if (bookInArray.includes(searchValue)) {
      // append only books that their name includes the value in search input
      htmlContent += `
          <tr>
              <td>${id}</td>
              <td>${book.name}</td>
              <td>${book.price}</td>
              <td>${book.category}</td>
              <td>${book.description}</td>
              <td> <button class="btn btn-info" onclick = "getBookInfo(${id})">Update</button></td>
              <td> <button class="btn btn-danger" onclick ="deleteBook(${id})" >Delete</button></td>    
          </tr>`;
    }
    id++;
  }
  tableBody.innerHTML = htmlContent;
}
