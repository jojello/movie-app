import React, { Component } from "react";
import "./css/Search.css";

class Search extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.input.value);
  };

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input
          className="search-input"
          type="text"
          name="search"
          ref={input => (this.input = input)}
          placeholder="Search..."
        />
        <button type="submit" id="submit" className="search-button">
          <i class="fa fa-search fa-5x"> </i>
        </button>
      </form>
    );
  }
}

export default Search;
