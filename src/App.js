import React, { Component } from "react";
import Movie from "./Movie";
import Header from "./Header";
import Search from "./Search";
// import Navbar from "./Navbar";
import "./css/App.css";

const config = {
  apiKey: "AIzaSyCCttsecJ70Sl-vXXgY-a2e3kwFKWAEN4k",
  authDomain: "looj-e0c69.firebaseapp.com",
  databaseURL: "https://looj-e0c69.firebaseio.com",
  projectId: "looj-e0c69",
  storageBucket: "looj-e0c69.appspot.com",
  messagingSenderId: "447816338857"
};

class App extends Component {
  constructor(props) {
    super(props);

    // firebase.initializeApp(config);

    this.state = {
      requestFailed: false,
      searchList: [],
      upcomingMovies: [],
      similarList: [],
      popupOpen: "none",
      popupInfo: ""
    };
  }

  togglePopup = (title, overview, homepage) => {
    this.setState({
      popupOpen: true,
      popupInfo: {
        title,
        overview,
        homepage
      }
    });
  };

  closePopup = () => {
    this.setState({
      popupOpen: "none",
      showLoader: false
    });
  };

  handleSearch = input => {
    this.fetchSearch(input);
  };

  handleSimilar = movieId => {
    this.fetchSimilar(movieId);
  };

  fetchUpcoming = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=d576aa547536be50ac9c1f00493ae5d6&language=en-US&page=1"
    )
      .then(results => results.json())
      .then(data => {
        let upcomingMovies = data.results.map(movie => {
          return {
            movieId: movie.id,
            original_title: movie.original_title,
            tagline: movie.tagline,
            overview: movie.overview,
            original_language: movie.original_language,
            poster: movie.poster_path,
            release: movie.release_date,
            vote: movie.vote_average,
            genre: movie.genre_ids
          };
        });
        this.setState({
          upcomingMovies: upcomingMovies
        });
        console.log("upcoming", this.state.upcomingMovies);
      });
  };

  fetchSearch = input => {
    const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=d576aa547536be50ac9c1f00493ae5d6&language=en-US&include_adult=false&page=1&query=${
      input
    }`;
    fetch(searchURL)
      .then(results => results.json())
      .then(data => {
        let searchList = data.results.map(movie => {
          return {
            movieId: movie.id,
            original_title: movie.original_title,
            tagline: movie.tagline,
            overview: movie.overview,
            homepage: movie.homepage,
            poster: movie.poster_path,
            release: movie.release_date,
            vote: movie.vote_average,
            genre: movie.genre_ids
          };
        });
        this.setState({
          searchList: searchList
        });
        console.log("search", this.state.searchList);
      });
  };

  // const similarMovieId = {this.state.searchList[0].movieId};

  fetchSimilar = movieId => {
    const similarURL =
      `https://api.themoviedb.org/3/movie/${movieId}` +
      `/similar?page=1&language=en-US&api_key=d576aa547536be50ac9c1f00493ae5d6`;
    fetch(similarURL)
      .then(results => results.json())
      .then(data => {
        let similarList = data.results.map(movie => {
          return {
            movieId: movie.id,
            original_title: movie.original_title,
            overview: movie.overview,
            homepage: movie.homepage,
            poster: movie.poster_path,
            release: movie.release_date,
            vote: movie.vote_average,
            genre: movie.genre_ids
          };
        });
        this.setState({
          similarList: similarList
        });
        console.log("similar", this.state.similarList);
      });
  };

  componentDidMount() {
    this.fetchUpcoming();
  }

  // <Navbar />
  render() {
    return (
      <div>
        <Header />

        <Search onSearch={this.handleSearch} />

        <div className="cards">
          <section id="main" className="container-searchmovies">
            {this.state.searchList.map(movie => {
              return (
                <Movie
                  title={movie.original_title}
                  movieId={movie.movieId}
                  overview={movie.overview}
                  poster={movie.poster}
                  vote={movie.vote_average}
                  key={movie.movieId}
                  onPopup={this.togglePopup}
                  onClick={this.fetchSimilar}
                />
              );
            })}
          </section>
          <section id="main" className="container-upmovies">
            {this.state.upcomingMovies.map(movie => {
              return (
                <Movie
                  title={movie.original_title}
                  overview={movie.overview}
                  poster={movie.poster}
                  vote={movie.vote}
                  movieId={movie.movieId}
                  key={movie.movieId}
                  onPopup={this.togglePopup}
                  onClick={this.fetchSimilar}
                />
              );
            })}
          </section>
          <section id="main" className="container-similarmovies">
            {this.state.similarList.map(movie => {
              return (
                <Movie
                  title={movie.original_title}
                  overview={movie.overview}
                  poster={movie.poster}
                  vote={movie.vote}
                  movieId={movie.movieId}
                  key={movie.movieId}
                  onPopup={this.togglePopup}
                  onClick={this.fetchSimilar}
                />
              );
            })}
          </section>
          <div className="popUp" style={{ display: this.state.popupOpen }}>
            <button
              type="button"
              className="closePopUp"
              onClick={this.closePopup}
            >
              X
            </button>
            <div className="container">
              <h2>{this.state.popupInfo.title}</h2>
              <h4>{this.state.popupInfo.overview}</h4>
              <form>
                <label>
                  <input
                    type="text"
                    placeholder="Post your review here..."
                    ref={ref => (this.postInput = ref)}
                  />
                </label>
                <a
                  onClick={this.postReview}
                  className="popUpAction"
                  target="_blank"
                >
                  POST
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
