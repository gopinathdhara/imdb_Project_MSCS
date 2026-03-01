import { movieLoading, movieError, movieData } from "./movieSlice";
import axios from "axios";
//Thunk middleware

// Because thunk middleware is installed:

//  dispatch() can now accept functions.

// Redux Thunk for API call Normally Redux only handles synchronous actions, but Thunk middleware allows async logic.

const fetchmovies = (pageNo) => {
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  console.log("TOKEN in fetchMovies:", import.meta.env.VITE_TMDB_TOKEN);
  return async (dispatch) => {
    try {
      dispatch(movieLoading());

      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${pageNo}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );
      //console.log(response.data.results);
      dispatch(movieData(response.data.results));
    } catch (err) {
      console.log(err);
      dispatch(movieError());
    }
  };
};

export default fetchmovies;
