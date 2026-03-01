import { createSlice } from "@reduxjs/toolkit";

// paginationSlice manages the current page number in Redux store.
// It provides actions to move to next and previous pages,
// allowing movie data to be fetched based on page changes.

const paginationSlice = createSlice({
  name: "Pagination_name",

  initialState: {
    pageNo: 1,
  },

  reducers: {
    handleNext: (state) => {
      state.pageNo = state.pageNo + 1;
    },
    handlePrevious: (state) => {
      if (state.pageNo > 1) {
        state.pageNo = state.pageNo - 1;
      }
    },
  },
});

export const { handlePrevious, handleNext } = paginationSlice.actions;
export default paginationSlice.reducer;
