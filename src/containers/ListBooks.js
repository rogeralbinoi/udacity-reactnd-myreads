import React from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from '../components/BooksGrid'
import PropTypes from 'prop-types'

const ListBooks = props => {
  const { books, changeShelf, loadingBookList } = props
  const booksCurrentlyReading = books.filter(
    book => book.shelf === 'currentlyReading'
  )
  const booksWantToRead = books.filter(book => book.shelf === 'wantToRead')
  const booksRead = books.filter(book => book.shelf === 'read')
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              {loadingBookList
                ? <div>Loading...</div>
                : <BooksGrid
                    changeShelf={changeShelf}
                    books={booksCurrentlyReading}
                  />}
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              {loadingBookList
                ? <div>Loading...</div>
                : <BooksGrid
                    changeShelf={changeShelf}
                    books={booksWantToRead}
                  />}
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              {loadingBookList
                ? <div>Loading...</div>
                : <BooksGrid changeShelf={changeShelf} books={booksRead} />}
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="search">Add a book</Link>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  books: PropTypes.array,
  changeShelf: PropTypes.func
}

export default ListBooks
