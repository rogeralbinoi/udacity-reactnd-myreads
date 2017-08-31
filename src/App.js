import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './containers/ListBooks'
import SearchBooks from './containers/SearchBooks'
import debounce from 'debounce'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
    loadingBookList: false,
    loadingSearch: false,
    emptyQuery: false
  }

  componentDidMount() {
    this.setState({ loadingBookList: true })
    BooksAPI.getAll().then(books => {
      this.setState({ books, loadingBookList: false })
    })
  }

  changeShelf = (book, shelf) => {
    this.setState({ loadingBookList: true })
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book]),
        loadingBookList: false
      }))
    })
  }

  search = debounce(query => {
    this.setState({ loadingSearch: true, emptyQuery: false })
    if (query) {
      BooksAPI.search(query).then(searchResults => {
        if (searchResults.error === 'empty query') {
          this.setState({
            searchResults: [],
            loadingSearch: false,
            emptyQuery: true
          })
          return
        }
        this.setState(state => {
          let results = searchResults.map(searchBook => {
            return (
              state.books.find(book => book.id === searchBook.id) || searchBook
            )
          })
          return { searchResults: results, loadingSearch: false }
        })
      })
    } else {
      this.setState({ searchResults: [], loadingSearch: false })
    }
  }, 500)

  clearSearchResults = () => {
    this.setState({ searchResults: [] })
  }

  render() {
    let {
      books,
      searchResults,
      loadingBookList,
      loadingSearch,
      emptyQuery
    } = this.state
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <ListBooks
              books={books}
              changeShelf={this.changeShelf}
              loadingBookList={loadingBookList}
            />}
        />
        <Route
          path="/search"
          render={() =>
            <SearchBooks
              changeShelf={this.changeShelf}
              search={this.search}
              clearSearchResults={this.clearSearchResults}
              searchResults={searchResults}
              loadingSearch={loadingSearch}
              emptyQuery={emptyQuery}
            />}
        />
      </div>
    )
  }
}

export default BooksApp
