import { createSlice } from "@reduxjs/toolkit";
import { Review } from "../../types/main";

export interface MainState {
  reviews: Review[];
  isLoading: boolean;
  message: string;
}

const initialState: MainState = {
  reviews: [],
  isLoading: false,
  message: '',
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    getReviews: (state) => {
      state.isLoading = true;
    },
    getReviewsSuccess: (state, action) => {
      state.reviews = action.payload;
      state.isLoading = false;
    },
    getReviewsFailure: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
  },
});

export const {getReviews, getReviewsSuccess, getReviewsFailure} = mainSlice.actions;

export default mainSlice.reducer;
