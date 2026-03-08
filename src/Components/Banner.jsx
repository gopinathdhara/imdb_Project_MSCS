import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function Banner() {
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const [movies, setMovies] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);
  const timerRef = useRef(null);
  //Carousel

  function getNext() {
    if (movies.length === 0) return; //edge case
    if (currentItem === movies.length - 1) {
      setCurrentItem(0);
    } else {
      setCurrentItem((prev) => prev + 1);
    }
  }
  function getPrev() {
    if (movies.length === 0) return; //edge case
    if (currentItem === 0) {
      setCurrentItem(movies.length - 1);
    } else {
      setCurrentItem((prev) => prev - 1);
    }
  }
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
        console.log(result.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;

    const timer = setInterval(() => {
      getNext();
    }, 2000);

    return () => clearInterval(timer);
  }, [movies, currentItem]);

  return (
    <>
      <div
        className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] bg-cover bg-center flex mt-1.5 items-end p-5"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movies[currentItem]?.backdrop_path})`,
        }}
      >
        <div className="absolute top-12 left-10 text-white max-w-md">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 drop-shadow-lg">
            {movies[currentItem]?.title}
          </h1>

          <div className="flex items-center gap-4 flex-wrap">
            <p className="inline-flex items-center gap-2 bg-black/70 px-4 py-2 rounded-xl text-yellow-400 font-bold text-lg shadow-lg backdrop-blur-sm">
              ⭐ {movies[currentItem]?.vote_average?.toFixed(1)} Rating
            </p>

            <Link to={`/movie-details/${movies[currentItem]?.id}`}>
              <button className="inline-flex items-center gap-2 bg-black/80 hover:bg-black text-yellow-400 px-5 py-2 rounded-xl font-bold text-lg shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105">
                🎬 View Details
              </button>
            </Link>
          </div>
        </div>

        <button
          onClick={getPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-yellow-400 text-black text-xl font-bold w-10 h-10 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300"
        >
          ❮
        </button>

        <button
          onClick={getNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-400 text-black text-xl font-bold w-10 h-10 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300"
        >
          ❯
        </button>
      </div>
    </>
  );
}

export default Banner;
