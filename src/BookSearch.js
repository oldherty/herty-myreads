import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import OneBook from './OneBook.js'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    state = {
        query: '',
        bookResults: [],
    }

    updateQuery = (tipi) => { 
        this.setState({
            query: tipi.trim()
        })
        BooksAPI.search(tipi, 10).then( (bookResults) => {
            this.setState({ bookResults })
        })
    }

    render() {
        const { books, onMoveBook } = this.props
        const { query, bookResults } = this.state

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
                    {bookResults.map( (result) => (
                        <OneBook key={result.id} book={result} onMoveBook={onMoveBook} />
                    ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks