
const myLibrary = [];

function Book(title, author, pagesNumber, didRead,coverColor) {
    if (!new.target) {
        throw Error("Book must be called with 'new' keyword")
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pagesNumber = pagesNumber;
    this.didRead = didRead;
    this.coverColor = coverColor
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pagesNumber} pages, ${this.didRead ? "read" : "not read yet"}.`
}

Book.prototype.toggleDidRead = function () {
    this.didRead = !this.didRead;
}

function addBookToLibrary(title, author, pagesNumber, didRead, coverColor) {
    const newBook = new Book(title, author, pagesNumber, didRead, coverColor);

    myLibrary.push(newBook);
}

function showTheLibrary() {
    myLibrary.forEach(
        (book) => {console.log(book.info)}
    )
}


const addBookBtn = document.getElementById('add-book');
const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('input',()=>{
    console.log(searchBar.value);
})