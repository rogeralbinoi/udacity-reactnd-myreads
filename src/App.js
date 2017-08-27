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
    this.setState({loadingBookList: true})
    BooksAPI.getAll().then(books => {
      this.setState({ books, loadingBookList: false })
    })
  }

  changeShelf = (book, shelf) => {
    this.setState({loadingBookList:true})
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
            this.setState({loadingBookList:true})
            BooksAPI.get(updatedBook.id).then(book => {
              this.setState(state => {
                return {books: state.books.concat(book), loadingBookList:false}
              })
            })
          }
        })
        
        return {books,loadingBookList:false}
      })
      
    })
  }

  search = debounce(query => {
    this.setState({loadingSearch: true, emptyQuery: false})
    if(query) {
      BooksAPI.search(query).then(searchResults => {
        if(searchResults.error === 'empty query') {
          this.setState({searchResults: [],loadingSearch: false, emptyQuery: true})
          return
        }
        this.setState((state) => {
          let results = searchResults.map((searchBook)=> {
            return state.books.find(book => book.id === searchBook.id) || searchBook
          })
          return {searchResults: results, loadingSearch:false}
        })
      })
    }else {
      this.setState({searchResults: [],loadingSearch: false})
    }
  }, 500)
  
  clearSearchResults = () => {
    this.setState({searchResults: []})
  }

  render() {
    let { books, searchResults, loadingBookList, loadingSearch, emptyQuery } = this.state
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <ListBooks books={books} changeShelf={this.changeShelf} loadingBookList={loadingBookList} />}
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
