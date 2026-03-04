import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import paginationReducer from "./paginationSlice";
import watchlistSlice from "./watchlistSlice";
import favouriteSlice from "./favouriteSlice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    pagination: paginationReducer,
    watch_list: watchlistSlice,
    favourites: favouriteSlice,
  },
});

export default store;
