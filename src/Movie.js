import React, { Component } from "react";
import AddMovieImg from "./Images/AddWatchList.png";
import LikeImg from "./Images/heart.png";
import YuckImg from "./Images/downvote.png";
import "./css/Movie.css";

class Movie extends Component {
  constructor() {
    super();
  }

  handleClick = () => {
    this.props.onPopup(
      this.props.title,
      this.props.overview,
      this.props.homepage
    );
  };

  handleNewList = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onClick(this.props.movieId);
  };

  // handleAddWatchList = () => {
  //
  // }

  render() {
    let url = `http://image.tmdb.org/t/p/original${this.props.poster}`;

    // console.log(this.props.poster);
    return (
      <movie className="card">
        <a
          onClick={this.handleClick}
          href="#"
          className="card-content-cardlink"
        >
          <img src={url} alt="" className="posterImage" />

          <div class="card-content">
            <h3>{this.props.title}</h3>

            <h5> Vote: {this.props.vote}</h5>
            <a
              href=""
              className="card-content-link"
              onClick={this.handleNewList}
            >
              Find More Like This
            </a>
            <img src={AddMovieImg} className="icon-add" />
            <img src={LikeImg} className="icon-like" />
            <img src={YuckImg} className="icon-yuck" />
          </div>
        </a>
      </movie>
    );
  }
}

export default Movie;
