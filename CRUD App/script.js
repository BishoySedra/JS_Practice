const bookName = document.getElementById("bookName");
const bookPrice = document.getElementById("bookPrice");
const bookCategory = document.getElementById("bookCategory");
const bookDescription = document.getElementById("bookDescription");
const addBtn = document.getElementById("add-btn");
const insertedBooks = document.getElementById("tableBody");

let booksContainer = [];

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
                <td><button class="btn btn-danger" onclick="deleteBook(${id})">Delete</button></td>    
            </tr>`;
        // the id of each book is passed inside get Book Info and delete book functions , so when we click on these buttons
        // those functions will be called and the book id are already passed to it , you can see it through inspect from the browser
        id++;
    }
    tableBody.innerHTML = htmlContent;
}


function clearForm() {
    bookName.value = ``;
    bookPrice.value = ``;
    bookCategory.value = ``;
    bookDescription.value = ``;
}

addBtn.addEventListener("click", addBook);


function addBook() {
    const book = {
        name: bookName.value,
        price: bookPrice.value,
        category: bookCategory.value,
        description: bookDescription.value
    }
    booksContainer.push(book);
    updateView();
    clearForm();
}

function updateBook(id) {

}

function deleteBook(id) {
    booksContainer.splice(id, 1);
    updateView();
}