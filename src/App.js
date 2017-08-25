import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './containers/ListBooks'
import SearchBooks from './containers/SearchBooks'
import debounce from 'debounce'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  changeShelf = (id, shelf) => {
    this.setState(state =>
      state.books.map(book => {
        if (book.id === id) {
          book.shelf = shelf
        }
        return book
      })
    )
  }

  search = debounce(query => {
    query &&
      BooksAPI.search(query).then(books => {
        this.setState({ books })
      })
  }, 500)

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <ListBooks
              books={this.state.books}
              changeShelf={this.changeShelf}
            />}
        />
        <Route
          path="/search"
          render={() =>
            <SearchBooks changeShelf={this.changeShelf} search={this.search} />}
        />
      </div>
    )
  }
}

export default BooksApp
