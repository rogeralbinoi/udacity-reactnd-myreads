import React, { Component } from 'react'
import BooksGridItem from '../components/BooksGridItem'
import PropTypes from 'prop-types'

const BooksGrid = props => {
  let { books, changeShelf } = props

  return (
    <ol className="books-grid">
      {books &&
        books.map(book =>
          <BooksGridItem key={book.id} book={book} changeShelf={changeShelf} />
        )}
    </ol>
  )
}

BooksGrid.propTypes = {
  books: PropTypes.array,
  changeShelf: PropTypes.func
}

export default BooksGrid
