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
            if( !bookResults.error) {
                this.setState({ bookResults })
            } else {
                this.setState({ bookResults: [] })
            }
        })
    }

    render() {
        const { books, onMoveBook, searchTerms } = this.props
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
                    <div className="search-limitations-disclaimer">
                        <label>Since this is just a demo, the search terms you can use are limited. "Hey," you might say, "that kind of defeats the purpose of typing, doesn't it?" It does indeed. Therefore, if your fingers are tired, feel free to pick the sanctioned terms from this list here instead.</label>
                        <select 
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        >
                        {searchTerms.map( (term) => (
                            <option key={term} value={term}>{term}</option>
                        ))}
                        </select>
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