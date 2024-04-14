import { createAction, createSlice } from "@reduxjs/toolkit";
import { Good, GoodsAction, Review } from "../../types/main";

export interface MainState {
  reviews: Review[];
  reviewsLoading: boolean;
  goods: Good[];
  goodsLoading: boolean;
  message: string;
}

const initialState: MainState = {
  reviews: [],
  reviewsLoading: false,
  goods: [],
  goodsLoading: false,
  message: '',
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    getReviews: (state) => {
      state.reviewsLoading = true;
    },
    getReviewsSuccess: (state, action) => {
      state.reviews = action.payload;
      state.reviewsLoading = false;
    },
    getReviewsFailure: (state, action) => {
      state.message = action.payload;
      state.reviewsLoading = false;
    },
    setGoodsLoading: (state) => {
      state.goodsLoading = true;
    },
    getGoodsSuccess: (state, action) => {
      state.goods = action.payload;
      state.goodsLoading = false;
    },
    getGoodsFailure: (state, action) => {
      state.message = action.payload;
      state.goodsLoading = false;
    },
  },
});

export const getGoods = createAction<GoodsAction>(
  'main/getGoods'
);

export const {getReviews, getReviewsSuccess, getReviewsFailure, setGoodsLoading, getGoodsFailure, getGoodsSuccess} = mainSlice.actions;

export default mainSlice.reducer;
