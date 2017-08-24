import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './containers/ListBooks'
import SearchBooks from './containers/SearchBooks'

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
          component={SearchBooks}
          changeShelf={this.changeShelf}
        />
      </div>
    )
  }
}

export default BooksApp
