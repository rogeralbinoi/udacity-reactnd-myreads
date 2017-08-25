import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from '../components/BooksGrid'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
  static propTypes = {
    changeShelf: PropTypes.func,
    search: PropTypes.func
  }

  state = {
    query: '',
    books: []
  }

  handdleChangeSearch = query => {
    this.setState(() => {
      this.props.search(query)
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
