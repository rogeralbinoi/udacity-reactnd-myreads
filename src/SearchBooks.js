import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  }

  search = query => {
    BooksAPI.search(query).then(books => {
      this.setState({ books })
    })
  }

  handdleChangeSearch = query => {
    this.setState(() => {
      this.search(query)
      return { query }
    })
  }

  render() {
    let { changeShelf } = this.props
    let { query } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/* 
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                        
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                    */}
            <input
              autoFocus
              type="text"
              value={query}
              onChange={e => {
                this.handdleChangeSearch(e.target.value)
              }}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid changeShelf={changeShelf} books={this.state.books} />
        </div>
      </div>
    )
  }
}

export default SearchBooks
