import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import OneBook from './OneBook.js'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    state = {
        query: '',
        bookResults: [],
    }

    refreshShelves = (results, shelved) => {
        for (const buk in shelved) {
            const bukid = shelved[buk].id
            const bukShelf = shelved[buk].shelf
            for (const book in results) {
                if( results[book].id === bukid ) {
                    results[book].shelf = bukShelf
                }
            }
        }
        this.setState({ bookResults: results })
    }
    updateQuery = (tipi) => { 
        this.setState({
            query: tipi
        })
        const shelvedBuks = this.props.books
        if( tipi.length > 0 ) {
            BooksAPI.search(tipi.trim(), 10).then( 
                (bookResults) => this.refreshShelves(bookResults, shelvedBuks), 
                () => this.setState({ bookResults: [] })
            )
        } else {
            this.setState({ bookResults: [] })
        }
    }

    render() {
        const { books, onMoveBook } = this.props
        const { query, bookResults } = this.state
        const searchTerms = ['Android', 
            'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 
            'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 
            'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 
            'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 
            'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 
            'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 
            'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 
            'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 
            'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 
            'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 
            'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 
            'Virtual Reality', 'Web Development', 'iOS'
        ]
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
                            onChange={(event) => {
                                this.updateQuery(event.target.value)
                                this.refreshShelves(bookResults, books)
                            }}
                        >
                        {searchTerms.map( (term) => (
                            <option key={term} value={term}>{term}</option>
                        ))}
                        </select>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {!bookResults.error && bookResults.map( (result) => (
                        <OneBook key={result.id} book={result} onMoveBook={onMoveBook} />
                    ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks