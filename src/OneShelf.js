import React from 'react'
import OneBook from './OneBook.js'

function OneShelf(props) {
    const {shelf, books, onMoveBook} = props
    
    return (
        <div key={shelf.id} id={shelf.id} className="bookshelf">
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {books.filter( (book) => book.shelf === shelf.id ).map( (book) => (
                    <OneBook key={book.id} book={book} onMoveBook={onMoveBook} />
                ))}
                </ol>
            </div>
        </div>
    )
}

export default OneShelf