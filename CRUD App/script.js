const bookName = document.getElementById("bookName");
const bookPrice = document.getElementById("bookPrice");
const bookCategory = document.getElementById("bookCategory");
const bookDescription = document.getElementById("bookDescription");
const addBtn = document.getElementById("add-btn");
const insertedBooks = document.getElementById("tableBody");

let booksContainer = [];

function updateView() {
    let htmlContent = ``; // empty string to append all array elements in it
    for (let i = 0; i < booksContainer.length; i++) {
        // at each book in the array, append book Info inside the string
        htmlContent += `
            <tr>
                <td>${i}</td> 
                <td>${booksContainer[i].name}</td>
                <td>${booksContainer[i].price}</td>
                <td>${booksContainer[i].category}</td>
                <td>${booksContainer[i].description}</td>
                <td> <button class="btn btn-info" onclick = "getBookInfo(${i})">Update</button></td>
                <td><button class="btn btn-danger" onclick="deleteBook(${i})">Delete</button></td>    
            </tr>`;
        // the id of each book is passed inside get Book Info and delete book functions , so when we click on these buttons
        // those functions will be called and the book id are already passed to it , you can see it through inspect from the browser
    }
    insertedBooks.innerHTML = htmlContent;
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