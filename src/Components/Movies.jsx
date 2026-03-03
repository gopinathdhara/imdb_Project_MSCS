import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchMovies from "../Redux/fetchMovies";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import {
  handleNext,
  handlePrevious,
  resetPage,
} from "../Redux/paginationSlice";
import { addWatchList, removeWatchList } from "../Redux/watchlistSlice";

function Movies() {
  const navigate = useNavigate();
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  //useDispatch hook
  const dispatch = useDispatch();

  const { movieSlc, loading, error } = useSelector((state) => state.movies);
  const pageNo = useSelector((state) => state.pagination.pageNo);
  const watchList = useSelector((state) => state.watch_list.watchlist);
  const [searchText, setSearchText] = useState("");
  const totalPages = useSelector((state) => state.movies.totalPages);

  //Add debounce (prevents too many API calls)

  //  Instead of calling dispatch(fetchMovies(...)) immediately, it waits 500ms.
  // If the user keeps typing or changing pageNo quickly, the timer resets each time
  // Only after the user stops changing values for 2000ms the API call actually fire
  // Debounce always waits for silence.
  // If typing continues → no silence → no API.

  //   Render 1
  // → Effect 1 (debounce)
  // → Effect 2 (resetPage)

  // resetPage updates pageNo

  // Render 2
  // → Effect 1 runs again (because pageNo changed)

  useEffect(() => {
    if (!TOKEN) {
      console.error("TMDB Token is missing");
      return;
    }
    //Add debounce for performance improve
    const timer = setTimeout(() => {
      dispatch(fetchMovies(pageNo, searchText));
    }, 1000);
    return () => clearTimeout(timer);
  }, [pageNo, searchText]);

  useEffect(() => {
    dispatch(resetPage()); // whenever search changes, go back to page 1
  }, [searchText]);

  function handleprev() {
    dispatch(handlePrevious());
  }
  function handlenext() {
    dispatch(handleNext());
  }

  function doescontain(movie_obj) {
    return watchList?.some((item) => item.id === movie_obj.id);
  }

  function addToWatchList(movieobj) {
    dispatch(addWatchList(movieobj));
  }

  function removeFromWatchList(movieobj) {
    dispatch(removeWatchList(movieobj));
  }

  // if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-semibold">Loading movies...</p>
      </div>
    );
  // if (error)
  //   return <div className="text-center mt-10">Error loading movies</div>;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-red-100 text-red-600 p-4 rounded-full mb-4">❌</div>

        <h2 className="text-xl font-bold text-red-600">
          Oops! Something went wrong.
        </h2>

        <p className="text-gray-600 mt-2">
          We couldn't load the movies. Please try again.
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
      <div className="text-2xl font-bold text-center m-5">
        <h1>Trending Movies</h1>
        <div className="flex justify-center my-4">
          <input
            type="text"
            placeholder="Search Movies..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-400 rounded-md px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-evenly text-center gap-8 flex-wrap">
        {movieSlc?.map((item, index) => {
          const imgPath = item.backdrop_path || item.poster_path;
          const check_if_contain = doescontain(item);
          return (
            <div className="movie-card">
              <div
                key={item.id}
                className="h-[40vh] w-[200px] rounded-xl flex flex-col bg-cover bg-center flex poster-wrap"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${imgPath})`,
                  cursor: "pointer",
                }}
              >
                {check_if_contain ? (
                  <div
                    className="m-4 flex "
                    onClick={() => removeFromWatchList(item)}
                  >
                    ❌
                  </div>
                ) : (
                  <div
                    className="m-4 flex "
                    onClick={() => addToWatchList(item)}
                  >
                    😍
                  </div>
                )}
                <div className="text-white text-xl p-2">{item.title}</div>

                {/* Movie Details Button */}
              </div>
              <div>
                <Link to={`/movie-details/${item.id}`}>
                  <button class="mybutton">View Details</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-gray-400 p-4 h-[50px] mt-8 w-full flex justify-center gap-4">
        <button onClick={handleprev}>
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        {pageNo}
        <button onClick={handlenext} disabled={pageNo >= totalPages}>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </>
  );
}

export default Movies;
