import { createSlice } from "@reduxjs/toolkit";

// movieSlice is used to manage movie-related state in Redux store.
// It stores movies data, loading status, and error state,
// and provides actions (movieLoading, movieData, movieError)
// to update the state when API requests start, succeed, or fail

const movieSlice = createSlice({
  name: "Movies_name",

  initialState: {
    movieSlc: [],
    loading: false,
    error: false,
    totalPages: 1,
  },

  reducers: {
    movieLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    movieError: (state) => {
      state.loading = false;
      state.error = true;
    },
    movieData: (state, action) => {
      state.loading = false;
      state.movieSlc = action.payload;
      state.error = false;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});
// named export - Action creator functions
export const { movieLoading, movieError, movieData, setTotalPages } =
  movieSlice.actions;
// Store needs reducer to manage state.
export default movieSlice.reducer;
