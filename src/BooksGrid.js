import React, {Component} from 'react'
import BooksGridItem from './BooksGridItem'
const BooksGrid = props => {
    let {books,changeShelf} = props
    return (
        <ol className="books-grid">
            { books &&
                books.map((book) => (
                    <BooksGridItem key={book.id} book={book} changeShelf={changeShelf}/>
                ))
            }
        </ol>
    )
}

export default BooksGrid