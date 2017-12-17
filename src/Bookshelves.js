import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import ShowBooks from './ShowBooks.js'

class Bookshelves extends Component {

    render() {
        const {books, shelves, onMoveBook} = this.props

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                    {shelves.map( (shelf) => (
                        <div key={shelf.id} className="bookshelf">
                            <h2 className="bookshelf-title">{shelf.title}</h2>
                            <div className="bookshelf-books">
                                <ShowBooks books={books} shelf={shelf.id} onMoveBook={onMoveBook} />
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/create" className="open-search-link">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default Bookshelves