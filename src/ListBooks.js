import React, {Component} from 'react'

class ListBooks extends Component {
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
                    <ol className="books-grid">
                    {books.filter( (book) => book.shelf === shelf.id ).map( (book) => (
                      <li key={book.id} className="book-list-item">
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{
                              width: 128, 
                              height: 193, 
                              backgroundImage: `url(${book.imageLinks.thumbnail})` 
                            }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={(chosen) => onMoveBook(book, chosen.value)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors.map( (author) => (
                            <span key={book.id}>{author}</span>
                          ))}</div>
                        </div>
                      </li>
                    ))}
                    </ol>
                  </div>
                </div>
              ))}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )
    }
}

export default ListBooks