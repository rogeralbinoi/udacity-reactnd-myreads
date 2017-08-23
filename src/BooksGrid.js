import React, {Component} from 'react'
import BooksGridItem from './BooksGridItem'
const BooksGrid = props => {
    let {books} = props
    return (
        <ol className="books-grid">
            { books &&
                books.map((book) => (
                    <BooksGridItem key={book.id} book={book}/>
                ))
            }
            {!books.length &&
                <span>Loading...</span>
            }
        </ol>
    )
}

export default BooksGrid