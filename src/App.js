import React, {Component} from 'react'
import { Route } from 'react-router-dom'

import Bookshelves from './Bookshelves.js'
import SearchBooks from './BookSearch.js'
import * as BooksAPI from './BooksAPI'
import { Switch } from 'react-router-dom'
import FourOFourPage from './404.js'

class BooksApp extends Component {
    state = {
        books: [],
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
            if(newShelf === "none") {
                alert(`'${theBook.title}' has been removed from all shelves.`)
            } else {
                alert(`'${theBook.title}' has been added to the ${newShelf} shelf.`)
            }
        })
    }
    render() {
        return (
            <div className="app">
                <Switch>
                    <Route exact path='/' render={() => (
                        <Bookshelves 
                            books={this.state.books} 
                            onMoveBook={this.changeShelf} 
                        />
                    )} />
                    <Route path='/search' render={({ history }) => (
                        <SearchBooks 
                            books={this.state.books} 
                            onMoveBook={this.changeShelf} 
                            searchTerms={this.state.searchTerms} 
                        />
                    )} />
                    <Route component={FourOFourPage} />
                </Switch>
            </div>
        )
    }
}
export default BooksApp
