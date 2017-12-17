import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'

import Bookshelves from './Bookshelves.js'
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {
    state = {
        books: [],
        shelves: [
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
        ],
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false
    }

    componentDidMount() {
        BooksAPI.getAll().then( (books) => {
            this.setState({ books })
        })
    }

    changeShelf = (theBook, newShelf) => {
        BooksAPI.update(theBook, newShelf)
        BooksAPI.getAll().then( (books) => {
            this.setState({ books })
        })
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <div className="list-books-wrapper">
                        <Bookshelves 
                            books={this.state.books} 
                            shelves={this.state.shelves} 
                            onMoveBook={this.changeShelf} 
                        />
                    </div>
                )} />
                <Route path='/search' render={({ history }) => (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <Link className="close-search" to="/">Close</Link>
                            <div className="search-books-input-wrapper">
                                {/*
                                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                                    You can find these search terms here:
                                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                                    you don't find a specific author or title. Every search is limited by search terms.
                                */}
                                <input type="text" placeholder="Search by title or author"/>

                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid"></ol>
                        </div>
                    </div>
                )} />
            </div>
        )
    }
}

export default BooksApp
