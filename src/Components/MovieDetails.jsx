import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addWatchList, removeWatchList } from "../Redux/watchlistSlice";
import { addFavouriteList, removeFavouriteList } from "../Redux/favouriteSlice";
import { FaFilm } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import useMovieTrailer from "../hooks/useMovieTrailer";

function MovieDetails() {
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const dispatch = useDispatch();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // similar movies
  const [similarMovies, setSimilarMovies] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [similarError, setSimilarError] = useState(false);

  // for movie trailer custom hook

  const { movieTrailerKey, trailerLoading, trailerError } = useMovieTrailer(id);

  // get global redux state value
  const favouriteList = useSelector((state) => state.favourites.favouritelist);
  const watchList = useSelector((state) => state.watch_list.watchlist);

  function doesContainFavourite(movie_obj) {
    return favouriteList?.some((item) => item?.id === movie_obj?.id);
  }
  function doescontain(movie_obj) {
    return watchList?.some((item) => item?.id === movie_obj?.id);
  }

  const check_if_contain = doescontain(movie);
  const check_if_favourite_contain = doesContainFavourite(movie);

  function addToWatchList(movieobj) {
    dispatch(addWatchList(movieobj));
  }

  function removeFromWatchList(movieobj) {
    dispatch(removeWatchList(movieobj));
  }

  function addToFavouriteList(movieobj) {
    dispatch(addFavouriteList(movieobj));
  }

  function removeToFavouriteList(movieobj) {
    dispatch(removeFavouriteList(movieobj));
  }

  //########## fetch Movie Details #####################

  useEffect(() => {
    setLoading(true);
    setError(false);
    async function fetchMovieDetails() {
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

        const response = await axios.get(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        //console.log(response.data);
        setMovie(response.data);
        setLoading(false);
        setError(false);
      } catch (e) {
        setLoading(false);
        setError(true);
        console.log(e);
      }
    }
    fetchMovieDetails();
  }, []);

  //##########fetch similar movies ##################

  useEffect(() => {
    setSimilarLoading(true);
    setSimilarError(false);

    async function fetchSimilarMovies() {
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;

        const response = await axios.get(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        //console.log(response.data.results);
        setSimilarMovies(response.data.results);
        setSimilarLoading(false);
        setSimilarError(false);
      } catch (e) {
        setSimilarLoading(false);
        setSimilarError(true);
        console.log(e);
      }
    }
    fetchSimilarMovies();
  }, []);

  //   if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-semibold">
          Loading movie details...
        </p>
      </div>
    );

  if (similarLoading)
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-semibold">
          Loading similar movies...
        </p>
      </div>
    );

  //   if (error)
  //     return <div className="text-center mt-10">Error loading movies</div>;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-red-100 text-red-600 p-4 rounded-full mb-4">❌</div>

        <h2 className="text-xl font-bold text-red-600">
          Oops! Something went wrong.
        </h2>

        <p className="text-gray-600 mt-2">
          We couldn't load the movie details. Please try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Retry
        </button>
      </div>
    );

  if (similarError)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-red-100 text-red-600 p-4 rounded-full mb-4">❌</div>

        <h2 className="text-xl font-bold text-red-600">
          Oops! Something went wrong.
        </h2>

        <p className="text-gray-600 mt-2">
          We couldn't load the similar movies. Please try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Retry
        </button>
      </div>
    );

  return (
    <>
      <h1
        className="text-3xl md:text-3xl font-extrabold text-orange-500 flex items-center justify-center gap-3 mb-6"
        style={{ marginTop: "20px" }}
      >
        <FaFilm size={32} />
        Movie Details
      </h1>

      <div
        className="relative w-full min-h-[70vh] rounded-2xl overflow-hidden bg-cover bg-center flex items-end"
        key={movie?.id}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

        <div className="relative z-10 p-6 md:p-10 max-w-3xl text-white">
          <h1 className="text-5xl md:text-5xl font-extrabold leading-tight">
            {movie?.title}
          </h1>

          {movie?.tagline && (
            <p className="mt-2 text-lg md:text-xl text-white/80 italic">
              {movie?.tagline}
            </p>
          )}

          {movie?.overview && (
            <p className="mt-4 text-sm md:text-base text-white/85 leading-relaxed">
              {movie?.overview}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/80">
            <span className="px-3 py-1 rounded-full bg-white/10">
              ⭐ {movie?.vote_average?.toFixed(1)}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10">
              📅 {movie?.release_date}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10">
              ⏱ {movie?.runtime} min
            </span>
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white">
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-white/70 text-xs">Status</p>
              <p className="font-semibold">{movie?.status}</p>
            </div>

            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-white/70 text-xs">Vote Count</p>
              <p className="font-semibold">
                {movie?.vote_count?.toLocaleString()}
              </p>
            </div>

            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-white/70 text-xs">Popularity</p>
              <p className="font-semibold">{movie?.popularity?.toFixed(1)}</p>
            </div>

            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-white/70 text-xs">Revenue</p>
              <p className="font-semibold">
                ${movie?.revenue?.toLocaleString()}
              </p>
            </div>
            <div
              className="bg-white/10 p-3 rounded-lg"
              style={{ display: "flex" }}
            >
              {check_if_favourite_contain ? (
                <div
                  className="m-4 flex favorite-icon"
                  onClick={() => removeToFavouriteList(movie)}
                >
                  <i className="fa-solid fa-heart"></i>
                </div>
              ) : (
                <div
                  className="m-4 flex favorite-icon"
                  onClick={() => addToFavouriteList(movie)}
                >
                  <i className="fa-regular fa-heart"></i>
                </div>
              )}{" "}
              {check_if_contain ? (
                <div
                  className="m-4 flex watchlist-icon1"
                  onClick={() => removeFromWatchList(movie)}
                >
                  ❌
                </div>
              ) : (
                <div
                  className="m-4 flex watchlist-icon1"
                  onClick={() => addToWatchList(movie)}
                >
                  😍
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <h1
        className="text-3xl md:text-3xl font-bold text-emerald-500 text-center mb-6 flex items-center justify-center gap-3"
        style={{ marginTop: "20px" }}
      >
        <FaPlayCircle size={32} /> Movie Trailer
      </h1>

      {trailerLoading && (
        <div className="flex justify-center items-center mt-6">
          <div className="text-xl font-semibold text-gray-500 animate-pulse">
            Loading Trailer...
          </div>
        </div>
      )}
      {trailerError && (
        <div className="flex justify-center items-center mt-6">
          <div className="text-xl font-semibold text-red-500">
            ❌ Failed to load trailer
          </div>
        </div>
      )}
      {!trailerLoading && !trailerError && movieTrailerKey && (
        <div className="flex justify-center mt-6">
          <iframe
            className="rounded-xl shadow-lg"
            width="900"
            height="500"
            src={`https://www.youtube.com/embed/${movieTrailerKey}`}
            title="Movie Trailer"
            allowFullScreen
          ></iframe>
        </div>
      )}
      {!trailerLoading && !trailerError && !movieTrailerKey && (
        <div className="flex justify-center items-center mt-6">
          <div className="px-6 py-3 rounded-xl bg-yellow-100 text-yellow-700 font-semibold shadow-md">
            🎬 No trailer available for this movie
          </div>
        </div>
      )}
      <div className="flex justify-center mt-8">
        <a
          href={`https://www.google.com/search?q=${movie?.title}+watch+online`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 text-white px-7 py-3 rounded-xl text-lg font-semibold hover:bg-red-700 transition duration-300 shadow-lg flex items-center gap-3"
        >
          <FaPlay className="text-white" />
          Watch Full Movie
        </a>
      </div>
      <h1
        className="text-3xl md:text-3xl font-extrabold text-blue-500 flex items-center justify-center gap-3 mb-6"
        style={{ marginTop: "20px" }}
      >
        <BiMoviePlay size={32} />
        Similar Movies
      </h1>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        style={{ marginTop: "20px" }}
      >
        {similarMovies?.map((m) => (
          <div
            key={m.id}
            className="rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition cursor-pointer"
          >
            <a href={`/movie-details/${m.id}`}>
              <div
                className="h-[220px] bg-cover bg-center"
                style={{
                  backgroundImage: m.poster_path
                    ? `url(https://image.tmdb.org/t/p/w500/${m.poster_path})`
                    : "none",
                }}
              />
              <div className="p-2">
                <p className="font-semibold text-sm line-clamp-2">
                  {m.title || m.name}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  ⭐ {m.vote_average?.toFixed(1)} • 📅 {m.release_date || "N/A"}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieDetails;
