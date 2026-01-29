

let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

function Book(title, author, pagesNumber, didRead) {
    if (!new.target) {
        throw Error("Book must be called with 'new' keyword")
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pagesNumber = pagesNumber;
    this.didRead = didRead;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pagesNumber} pages, ${this.didRead ? "read" : "not read yet"}.`
}

Book.prototype.toggleDidRead = function () {
    this.didRead = !this.didRead;
}

myLibrary.forEach(book => {
    Object.setPrototypeOf(book, Book.prototype);
})

function addBookToLibrary(title, author, pagesNumber, didRead) {
    const newBook = new Book(title, author, pagesNumber, didRead);

    myLibrary.push(newBook);
}

function showTheLibrary() {
    myLibrary.forEach(
        (book) => { console.log(book.info) }
    )
}

function bookCard(book) {
    return `<div class="book-cell">
            <div class="book" data-id="${book.id}">
                <div class="book-strip"></div>
                <div class="book-info ${book.didRead ? 'read' : 'not-read'}">
                    <div class="btn-cosplay delete-book-btn">
                        <svg class="delete-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>delete</title>
                            <path
                                d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                        </svg>
                    </div>
                    <h3>${book.title}</h3>
                    <h5>by</h5>
                    <h3>${book.author}</h3>
                    <div class="book-footer">
                        <h5>${book.pagesNumber} Pages</h3>
                            <div class="btn-cosplay toggle-read-btn">
                                <svg class="read-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <title>book-open-variant</title>
                                    <path
                                        d="M12 21.5C10.65 20.65 8.2 20 6.5 20C4.85 20 3.15 20.3 1.75 21.05C1.65 21.1 1.6 21.1 1.5 21.1C1.25 21.1 1 20.85 1 20.6V6C1.6 5.55 2.25 5.25 3 5C4.11 4.65 5.33 4.5 6.5 4.5C8.45 4.5 10.55 4.9 12 6C13.45 4.9 15.55 4.5 17.5 4.5C18.67 4.5 19.89 4.65 21 5C21.75 5.25 22.4 5.55 23 6V20.6C23 20.85 22.75 21.1 22.5 21.1C22.4 21.1 22.35 21.1 22.25 21.05C20.85 20.3 19.15 20 17.5 20C15.8 20 13.35 20.65 12 21.5M12 8V19.5C13.35 18.65 15.8 18 17.5 18C18.7 18 19.9 18.15 21 18.5V7C19.9 6.65 18.7 6.5 17.5 6.5C15.8 6.5 13.35 7.15 12 8M13 11.5C14.11 10.82 15.6 10.5 17.5 10.5C18.41 10.5 19.26 10.59 20 10.78V9.23C19.13 9.08 18.29 9 17.5 9C15.73 9 14.23 9.28 13 9.84V11.5M17.5 11.67C15.79 11.67 14.29 11.93 13 12.46V14.15C14.11 13.5 15.6 13.16 17.5 13.16C18.54 13.16 19.38 13.24 20 13.4V11.9C19.13 11.74 18.29 11.67 17.5 11.67M20 14.57C19.13 14.41 18.29 14.33 17.5 14.33C15.67 14.33 14.17 14.6 13 15.13V16.82C14.11 16.16 15.6 15.83 17.5 15.83C18.54 15.83 19.38 15.91 20 16.07V14.57Z" />
                                </svg>
                            </div>
                    </div>
                </div>
            </div>
        </div>`;
}




const addBookBtn = document.getElementById('add-book');
const searchBar = document.getElementById('search-bar');
const modal = document.getElementById('add-book-dialog');
const closeModalBtn = document.getElementById('close-dialog');
const form = document.querySelector('form');
const container = document.getElementById('layer-1')



function renderBooks() {
    container.innerHTML = '';
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

    myLibrary.forEach(item => {
        const newCard = bookCard(item);
        container.innerHTML += newCard;
    })
}

container.addEventListener('click', function (e) {

    if (e.target.closest('.delete-book-btn')) {
        const bookID = e.target.closest('.book').dataset.id;

        myLibrary = myLibrary.filter(item => item.id != bookID);
        renderBooks()
    }

    if (e.target.closest('.toggle-read-btn')) {
        const bookID = e.target.closest('.book').dataset.id;
        const index  = myLibrary.findIndex( item => item.id===bookID) 
        myLibrary[index].toggleDidRead();
        renderBooks()
    }

})

addBookBtn.addEventListener('click', () => {
    modal.showModal();
    myLibrary.forEach(item => console.log(item));
})

closeModalBtn.addEventListener('click', () => {
    modal.close();
})

searchBar.addEventListener('input', () => {
    if (searchBar.value == "") {
        renderBooks();
        return;
    }
    const container = document.getElementById('layer-1')
    const filteredBook = myLibrary.filter(item => `${item.title} by ${item.author}`.startsWith(searchBar.value));
    container.innerHTML = '';

    filteredBook.forEach(item => {
        const newCard = bookCard(item);
        container.innerHTML += newCard;
    })

})

modal.addEventListener('click', (e) => {
    const dimensions = modal.getBoundingClientRect();
    if (e.clientX > dimensions.right ||
        e.clientX < dimensions.left ||
        e.clientY > dimensions.bottom ||
        e.clientY < dimensions.top
    ) {
        modal.close();
    }
})

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pagesNumber = document.getElementById('pagesNumber').value;
    const didRead = document.getElementById('didRead').checked;

    addBookToLibrary(title, author, pagesNumber, didRead)
    modal.close();
    this.reset();

    renderBooks();
})


renderBooks();
console.log(Array.prototype)