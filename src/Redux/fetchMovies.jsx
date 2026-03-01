import {
  movieLoading,
  movieError,
  movieData,
  setTotalPages,
} from "./movieSlice";
import axios from "axios";
//Thunk middleware

// Because thunk middleware is installed:

//  dispatch() can now accept functions.

// Redux Thunk for API call Normally Redux only handles synchronous actions, but Thunk middleware allows async logic.

const fetchmovies = (pageNo, searchText) => {
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  //console.log("TOKEN in fetchMovies:", import.meta.env.VITE_TMDB_TOKEN);
  return async (dispatch) => {
    try {
      dispatch(movieLoading());
      const url = searchText
        ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            searchText,
          )}&language=en-US&page=${pageNo}`
        : `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${pageNo}`;

      console.log(url);

      const response = await axios.get(url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      console.log(response.data);
      dispatch(setTotalPages(response.data.total_pages));
      dispatch(movieData(response.data.results));
    } catch (err) {
      console.log(err);
      dispatch(movieError());
    }
  };
};

export default fetchmovies;
