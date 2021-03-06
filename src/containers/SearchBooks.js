import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from '../components/BooksGrid'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
  static propTypes = {
    changeShelf: PropTypes.func,
    search: PropTypes.func,
    clearSearchResults: PropTypes.func
  }

  componentWillMount() {
    this.props.clearSearchResults()
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
    let { changeShelf, loadingSearch, emptyQuery } = this.props
    let { query } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
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
          {loadingSearch
            ? <div>Loading...</div>
            : <BooksGrid
                changeShelf={changeShelf}
                books={this.props.searchResults}
              />}
          {emptyQuery && <div>Nothing here :(</div>}
        </div>
      </div>
    )
  }
}

export default SearchBooks
