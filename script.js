var books = JSON.parse(localStorage.getItem('books')) || { incomplete: [], complete: [] };
function renderBooks() {
    var incompleteBookList = document.getElementById('incompleteBookList');
    var completeBookList = document.getElementById('completeBookList');
    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';
    books.incomplete.forEach(function (book, i) {
        var bookItem = createBookItem(book, i, false);
        incompleteBookList.appendChild(bookItem);
    });
    books.complete.forEach(function (book, i) {
        var bookItem = createBookItem(book, i, true);
        completeBookList.appendChild(bookItem);
    });
}
function createBookItem(book, index, isComplete) {
    var bookItem = document.createElement('div');
    bookItem.className = 'book-item';
    
    var bookInfo = document.createElement('span');
    bookInfo.className = 'book-name';
    bookInfo.textContent = `${book.title} oleh ${book.author} (${book.year})`;
    
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function () {
        if (isComplete) {
            books.complete.splice(index, 1);
        } else {
            books.incomplete.splice(index, 1);
        }
        localStorage.setItem('books', JSON.stringify(books));
        renderBooks();
    });
    
    var toggleButton = document.createElement('button');
    toggleButton.textContent = isComplete ? 'Belum selesai' : 'Selesai dibaca';
    toggleButton.className = isComplete ? 'incomplete-button' : 'complete-button';
    toggleButton.addEventListener('click', function () {
        if (isComplete) {
            books.incomplete.push(books.complete.splice(index, 1)[0]);
        } else {
            books.complete.push(books.incomplete.splice(index, 1)[0]);
        }
        localStorage.setItem('books', JSON.stringify(books));
        renderBooks();
    });
    
    var buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';
    buttonGroup.appendChild(deleteButton);
    buttonGroup.appendChild(toggleButton);
    
    bookItem.appendChild(bookInfo);
    bookItem.appendChild(buttonGroup);
    
    return bookItem;
}
document.getElementById('addButton').addEventListener('click', function () {
    var titleInput = document.getElementById('titleInput');
    var authorInput = document.getElementById('authorInput');
    var yearInput = document.getElementById('yearInput');
    
    if (titleInput.value.trim() && authorInput.value.trim() && yearInput.value.trim()) {
        var newBook = {
            id: Date.now(),
            title: titleInput.value.trim(),
            author: authorInput.value.trim(),
            year: parseInt(yearInput.value.trim()),
            isComplete: false
        };
        
        books.incomplete.push(newBook);
        localStorage.setItem('books', JSON.stringify(books));
        renderBooks();
        
        titleInput.value = '';
        authorInput.value = '';
        yearInput.value = '';
    } else {
        alert("Semua kolom harus diisi");
    }
});
renderBooks();