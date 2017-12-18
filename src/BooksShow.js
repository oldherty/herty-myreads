import React, {Component} from 'react'

class ShowBooks extends Component {
    state = {
        currentShelf: this.props.shelf,
    }
    render() {
        const {books, shelf, onMoveBook} = this.props
        console.log(shelf)
        console.log(books)
        
        /* Necessary for search to actually work with this component
            if( books !== undefined ) {
                const showBooks = books.filter( (books) => books.shelf === shelf )
            } else {
                const showBooks = books
            }
        */

        return (
            <ol className="books-grid">
            {books.filter( (book) => book.shelf === shelf ).map( (book) => (
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
                        {book.authors.map( (author) => (
                            <span key={author}>{author}</span>
                        ))}
                        </div>
                    </div>
                </li>
            ))}
            </ol>
        )        
    }
}

export default ShowBooks