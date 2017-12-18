import React, {Component} from 'react'
import { Route } from 'react-router-dom'

import Bookshelves from './Bookshelves.js'
import SearchBooks from './BookSearch.js'
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
        searchTerms: ['Android', 
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
    }
    componentDidMount() {
        BooksAPI.getAll().then( (books) => {
            this.setState({ books })
        })
    }
    changeShelf = (theBook, newShelf) => {
        BooksAPI.update(theBook, newShelf).then( (books) => {
            BooksAPI.getAll().then( (books) => {
                this.setState({ books })
            })
        })
    }
    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <Bookshelves 
                        books={this.state.books} 
                        shelves={this.state.shelves} 
                        onMoveBook={this.changeShelf} 
                    />
                )} />
                <Route path='/search' render={({ history }) => (
                    <SearchBooks 
                        books={this.state.books} 
                        shelves={this.state.shelves} 
                        onMoveBook={this.changeShelf} 
                        searchTerms={this.state.searchTerms} 
                    />
                )} />
            </div>
        )
    }
}
export default BooksApp
