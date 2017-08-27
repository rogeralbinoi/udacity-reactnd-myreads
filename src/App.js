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
      let updatedBooks = [
        ...books.currentlyReading.map(id => ({
          id,
          shelf: 'currentlyReading'
        })),
        ...books.read.map(id => ({ id, shelf: 'read' })),
        ...books.wantToRead.map(id => ({ id, shelf: 'wantToRead' }))
      ]
      
      this.setState((state) => {
        let books = state.books.filter(book => {
          return (updatedBooks.find(updatedBook => updatedBook.id === book.id) ? true : false)
        }).map(book => {
          book.shelf = updatedBooks.find(updatedBook => updatedBook.id === book.id).shelf
          return book
        })
        
        updatedBooks.forEach(updatedBook => {
          let bookMatch = state.books.find(book => {
            return book.id === updatedBook.id
          }) ? true : false
          if(!bookMatch) {
            BooksAPI.get(updatedBook.id).then(book => {
              this.setState(state => {
                return {books: state.books.concat(book)}
              })
            })
          }
        })
        
        return {books}
      })
      
    })
  }

  search = debounce(query => {
    query &&
      BooksAPI.search(query).then(searchResults => {
        this.setState((state)=> {
          let results = searchResults.map((searchBook)=> {
            return state.books.find(book => book.id === searchBook.id) || searchBook
          })
          return {searchResults: results}
        })
      })
  }, 500)
  
  clearSearchResults = () => {
    this.setState({searchResults: []})
  }

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
              clearSearchResults={this.clearSearchResults}
              searchResults={searchResults}
            />}
        />
      </div>
    )
  }
}

export default BooksApp
