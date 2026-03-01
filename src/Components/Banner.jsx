import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Banner() {
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!TOKEN) {
      console.error("TMDB Token is missing");
      return;
    }

    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((result) => {
        setMovies(result.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div
        className="h-[40vh] bg-cover bg-center flex mt-1.5"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movies[0]?.backdrop_path})`,
        }}
      ></div>
    </>
  );
}

export default Banner;
