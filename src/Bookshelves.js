import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import OneShelf from './OneShelf.js'

function Bookshelves(props) {
    const {books, onMoveBook} = props
    const shelves = [
        {
            id: "currentlyReading",
            title: "Currently Reading",
        },
        {
            id: "wantToRead",
            title: "Want to Read",
        },
        {
            id: "read",
            title: "Read",
        },
    ]

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                {shelves.map( (shelf) => (
                    <OneShelf key={shelf.id} shelf={shelf} books={books} onMoveBook={onMoveBook} />
                ))}
                </div>
            </div>
            <div className="open-search">
                <Link to="/search" className="open-search-link">Add a book</Link>
            </div>
        </div>
    )
}

export default Bookshelves