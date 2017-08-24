import React, { Component } from 'react'

class BooksGridItem extends Component {
  state = {
    shelf: this.props.book.shelf || 'none'
  }

  handleChangeShelf = (id, shelf) => {
    this.setState({ shelf })
    this.props.changeShelf(id, shelf)
  }

  render() {
    let { book } = this.props
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${book.imageLinks.smallThumbnail}")`
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={this.state.shelf}
                onChange={e => {
                  this.handleChangeShelf(book.id, e.target.value)
                }}
              >
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">
            {book.title}
          </div>
          <div className="book-authors">
            {book.authors &&
              book.authors.map((author, key) => {
                if (key > 0) {
                  return ` & ${author}`
                } else {
                  return author
                }
              })}
          </div>
        </div>
      </li>
    )
  }
}

export default BooksGridItem
