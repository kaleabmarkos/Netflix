import React, { useState, useEffect } from "react";
import axios from "../axios";
import classes from "./Row.module.css";
import Youtube from "react-youtube";
import movieTrailer from 'movie-trailer'

const baseUrl = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargePoster }) => {
  const [movies, setMovies] = useState([]);
  const [ trailerUrl, setTrailerUrl ] = useState("")

  // snippet of code that runs on a specific condition/variable
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    }
  }

  // triggering the trailer popups
  const handleClick = (movie) => {
    console.log(movie);
    if(trailerUrl) {
      setTrailerUrl('')
    } else {
      let movieName
      if (movie.name ){
        movieName = movie.name
      } else {
        movieName = movie.title
      }
      movieTrailer( movieName || "")
      .then(url => {
        // https://www.youtube.com/watch?v=5i6A1IHAQsg
        const urlParams = new URLSearchParams(new URL(url).search) // this extracts the string || trailerID
        setTrailerUrl(urlParams.get("v"))  // gets the value of "v" which is the trailer ID
      }).catch(error => console.log(error))
    }
  }
  // console.log(movies);

  return (
    <div className={classes.row}>
      <h2>{title}</h2>

      <div className={classes.row__posters}>
        {/* container => posters */}
        {movies.map((movie) => (
          <img
            className={`${classes.row__poster} ${
              isLargePoster && classes.row_posterLarge
            }`}
            key={movie.id}
            onClick={() => handleClick(movie)}
            src={`${baseUrl}${
              isLargePoster ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />
}    </div>
  );
};

export default Row;
