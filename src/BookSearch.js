import React, {Component} from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line
import ShowBooks from './BooksShow.js'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    state = {
        query: '',
        theeZBookZZ: [],
    }

    updateQuery = (tipi) => { this.setState({ query: tipi.trim() }) }
    clearQuery = () => { this.setState({ query: '' }) }

    render() {
        // eslint-disable-next-line
        const { books, shelves, searchTerms, onMoveBook } = this.props
        const { query } = this.state

        let bookResults
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            const bookResults = BooksAPI.search(match, 10).then( (books) => alert("jjj") )
            // bookResults = books.filter((book) => match.test(book.title))
            /*
            bookResults = BooksAPI.search(match, 10).then( (books) => {
                this.setState({ books })
            })
            console.log(`Oh look here its ${bookResults}`)
            */
        } else {
            bookResults = []
            console.log(`Ain't no ${bookResults}`)
        }

        // bookResults.sort(sortBy('name'))

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type='text'
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
            <ol className="books-grid">
            {[].map( (book) => (
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
                </div>
            </div>
        )
    }
}

export default SearchBooks