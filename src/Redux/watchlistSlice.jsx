import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist_name",

  initialState: {
    watchlist: JSON.parse(localStorage.getItem("localwatchlist")) || [],
  },

  reducers: {
    addWatchList: (state, action) => {
      const movieobj = action.payload;
      state.watchlist = [...state.watchlist, movieobj];
      localStorage.setItem("localwatchlist", JSON.stringify(state.watchlist));
    },
    removeWatchList: (state, action) => {
      const movieobj = action.payload;
      const filtered = state.watchlist.filter((item) => item.id != movieobj.id);
      state.watchlist = filtered;
      localStorage.setItem("localwatchlist", JSON.stringify(filtered));
    },
    sortRatingDesc1: (state, action) => {
      let sorted_data = [...state.watchlist].sort(
        (a, b) => b.vote_average - a.vote_average,
      );
      state.watchlist = sorted_data;
    },

    sortRatingAsc1: (state, action) => {
      let sorted_data = [...state.watchlist].sort(
        (a, b) => a.vote_average - b.vote_average,
      );
      state.watchlist = sorted_data;
    },

    sortPopularityDesc1: (state, action) => {
      let sorted_data = [...state.watchlist].sort(
        (a, b) => b.popularity - a.popularity,
      );
      state.watchlist = sorted_data;
    },

    sortPopularityAsc1: (state, action) => {
      let sorted_data = [...state.watchlist].sort(
        (a, b) => a.popularity - b.popularity,
      );
      state.watchlist = sorted_data;
    },
  },
});
// named export - Action creator functions
export const {
  addWatchList,
  removeWatchList,
  sortRatingDesc1,
  sortRatingAsc1,
  sortPopularityDesc1,
  sortPopularityAsc1,
} = watchlistSlice.actions;
// Store needs reducer to manage state.
export default watchlistSlice.reducer;
