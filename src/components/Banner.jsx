import React, { useState, useEffect } from "react";
import axios from "../axios";

import classes from "./Banner.module.css";
import requests from "../requests";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      console.log(
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ]
        )
      );
    };
    fetchData();
  }, []);

  // console.log(movie);

  const truncate = (str, n) => {        // this shortens the text of the description and adds ..
    return str?.length > n ? str.substr(0, n -1) + "..." : str;
  }

  return (
    <header
      className={classes.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className={classes.banner_contents}>
        <h1 className={classes.banner__title}>{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className={classes.banner_buttons}>
          <button className={classes.banner__button}>Play</button>
          <button className={classes.banner__button}>My List</button>
        </div>
        <h1 className={classes.banner_description}>
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className={classes.banner__fadebottom}></div>

    </header>
  );
};

export default Banner;
