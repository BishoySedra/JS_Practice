const bookName = document.getElementById("bookName");
const bookPrice = document.getElementById("bookPrice");
const bookCategory = document.getElementById("bookCategory");
const bookDescription = document.getElementById("bookDescription");
const addBtn = document.getElementById("add-btn");
const container = document.getElementById("tableBody");
const updateBtn = document.getElementById("update-btn");
const searchBox = document.getElementById("searchInput");

let books = [];
let selectedId = null;

checkLocalStorage();

addBtn.addEventListener("click", addBook);
updateBtn.addEventListener("click", function () {
    updateBook(selectedId);
});


function updateView() {
    let htmlContent = ``;
    for (let i = 0; i < books.length; i++) {
        htmlContent += `<tr>
        <td>${i}</td> 
        <td>${books[i].name}</td>
        <td>${books[i].price}</td>
        <td>${books[i].category}</td>
        <td>${books[i].description}</td>
        <td> <button class="btn btn-info" onclick = "getBookInfo(${i})">Update</button></td>
        <td> <button class="btn btn-danger" onclick ="deleteBook(${i})">Delete</button></td>    
        </tr>`
    }
    container.innerHTML = htmlContent;
}

function addBook() {
    const book = {
        name: bookName.value,
        price: bookPrice.value,
        category: bookCategory.value,
        description: bookDescription.value
    };
    books.push(book);
    updateView();
    localStorage.setItem("books", JSON.stringify(books));
    clearForm();
}

function deleteBook(id) {
    books.splice(id, 1);
    updateView();
    localStorage.setItem("books", JSON.stringify(books));
}

function updateBook(id) {
    books[id].name = bookName.value;
    books[id].price = bookPrice.value;
    books[id].category = bookCategory.value;
    books[id].description = bookDescription.value;
    updateView();
    localStorage.setItem("books", JSON.stringify(books));
    swapButtons();
    clearForm();
    selectedId = null;
}

function getBookInfo(id) {
    bookName.value = books[id].name;
    bookPrice.value = books[id].price;
    bookCategory.value = books[id].category;
    bookDescription.value = books[id].description;
    selectedId = id;
    swapButtons();
    // console.log("here");
}

function swapButtons() {
    addBtn.classList.toggle("d-none");
    updateBtn.classList.toggle("d-none");
}

function clearForm() {
    bookName.value = ``;
    bookPrice.value = ``;
    bookCategory.value = ``;
    bookDescription.value = ``;
}

function searchBook() {
    let htmlContent = ``;
    for (let i = 0; i < books.length; i++) {
        const nameAvailable = books[i].name.toLowerCase();
        const myValue = searchBox.value.toLowerCase();
        if (nameAvailable.includes(myValue)) {
            htmlContent += `<tr>
            <td>${i}</td> 
            <td>${books[i].name}</td>
            <td>${books[i].price}</td>
            <td>${books[i].category}</td>
            <td>${books[i].description}</td>
            <td> <button class="btn btn-info" onclick = "getBookInfo(${i})">Update</button></td>
            <td> <button class="btn btn-danger" onclick ="deleteBook(${i})">Delete</button></td>    
            </tr>`
        }
    }
    container.innerHTML = htmlContent;
}

function checkLocalStorage() {
    if (localStorage.getItem("books") === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem("books"));
    }
    updateView();
}