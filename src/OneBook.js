import React from 'react'

function OneBook(props) {
    const {book, onMoveBook} = props
    return (
        <li key={book.id} className="book-list-item">
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128, 
                        height: 193, 
                        backgroundImage: `url(${book.imageLinks.thumbnail})` 
                    }}></div>
                    <div className="book-shelf-changer">
                        <select 
                            value={book.shelf} 
                            onChange={(chosen) => onMoveBook(book, chosen.target.value)}
                        >
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                {book.authors !== undefined && book.authors.map( (author) => (
                    <span key={author}>{author}</span>
                ))}
                </div>
            </div>
        </li>
    )
}

export default OneBook




