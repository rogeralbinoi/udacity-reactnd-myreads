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
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(books => {
      let updatedBooksShelf = [
        ...books.currentlyReading.map(id => ({
          id,
          shelf: 'currentlyReading'
        })),
        ...books.read.map(id => ({ id, shelf: 'read' })),
        ...books.wantToRead.map(id => ({ id, shelf: 'wantToRead' }))
      ]

      this.setState(state => {
        return state.books.map(book => {
          let bookShelf = updatedBooksShelf.find(bookShelf => {
            return book.id === bookShelf.id
          }).shelf

          book.shelf = bookShelf
          return book
        })
      })
    })
  }

  search = debounce(query => {
    query &&
      BooksAPI.search(query).then(searchResults => {
        this.setState(state => ({
          searchResults: Object.assign(searchResults, state.books)
        }))
      })
  }, 500)

  render() {
    let { books, searchResults } = this.state
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <ListBooks books={books} changeShelf={this.changeShelf} />}
        />
        <Route
          path="/search"
          render={() =>
            <SearchBooks
              changeShelf={this.changeShelf}
              search={this.search}
              searchResults={searchResults}
            />}
        />
      </div>
    )
  }
}

export default BooksApp
