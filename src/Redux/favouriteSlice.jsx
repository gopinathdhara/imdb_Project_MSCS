import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favouritelist_name",

  initialState: {
    favouritelist: JSON.parse(localStorage.getItem("localfavouritelist")) || [],
  },

  reducers: {
    addFavouriteList: (state, action) => {
      const movieobj = action.payload;
      state.favouritelist = [...state.favouritelist, movieobj];
      localStorage.setItem(
        "localfavouritelist",
        JSON.stringify(state.favouritelist),
      );
    },
    removeFavouriteList: (state, action) => {
      const movieobj = action.payload;
      const filtered = state.favouritelist.filter(
        (item) => item.id != movieobj.id,
      );
      state.favouritelist = filtered;
      localStorage.setItem("localfavouritelist", JSON.stringify(filtered));
    },
    sortRatingDesc1: (state, action) => {
      let sorted_data = [...state.favouritelist].sort(
        (a, b) => b.vote_average - a.vote_average,
      );
      state.favouritelist = sorted_data;
    },

    sortRatingAsc1: (state, action) => {
      let sorted_data = [...state.favouritelist].sort(
        (a, b) => a.vote_average - b.vote_average,
      );
      state.favouritelist = sorted_data;
    },

    sortPopularityDesc1: (state, action) => {
      let sorted_data = [...state.favouritelist].sort(
        (a, b) => b.popularity - a.popularity,
      );
      state.favouritelist = sorted_data;
    },

    sortPopularityAsc1: (state, action) => {
      let sorted_data = [...state.favouritelist].sort(
        (a, b) => a.popularity - b.popularity,
      );
      state.favouritelist = sorted_data;
    },
  },
});
// named export - Action creator functions
export const {
  addFavouriteList,
  removeFavouriteList,
  sortRatingDesc1,
  sortRatingAsc1,
  sortPopularityDesc1,
  sortPopularityAsc1,
} = favouriteSlice.actions;
// Store needs reducer to manage state.
export default favouriteSlice.reducer;
