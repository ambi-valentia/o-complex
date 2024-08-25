import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Good, GoodsReviewsAction, Review, Theme } from "../../types/main";
import { reviews } from "../../mocks/reviews.mock";
import { goods } from "../../mocks/goods.mock";

export interface MainState {
  theme: Theme | null;
  reviews: Review[];
  reviewsLoading: boolean;
  goods: Good[];
  goodsLoading: boolean;
  message: string;
}

const initialState: MainState = {
  theme: null,
  reviews: reviews,
  reviewsLoading: false,
  goods: goods,
  goodsLoading: false,
  message: '',
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      if(state.theme === 'light')
        state.theme = 'dark' 
      else state.theme = 'light';
    },
    setReviewsLoading: (state) => {
      state.reviewsLoading = true;
    },
    setReviewsSuccess: (state, action) => {
      state.reviews = action.payload;
      state.reviewsLoading = false;
    },
    setReviewsFailure: (state, action) => {
      state.message = action.payload;
      state.reviewsLoading = false;
    },
    setGoodsLoading: (state) => {
      state.goodsLoading = true;
    },
    setGoodsSuccess: (state, action) => {
      state.goods = action.payload;
      state.goodsLoading = false;
    },
    setGoodsFailure: (state, action) => {
      state.message = action.payload;
      state.goodsLoading = false;
    },
  },
});

export const getGoods = createAction<GoodsReviewsAction>(
  'main/getGoods'
);

export const getReviews = createAction<GoodsReviewsAction>(
  'main/getReviews'
);

export const {setTheme, toggleTheme, setReviewsLoading, setReviewsSuccess, 
  setReviewsFailure, setGoodsLoading, setGoodsFailure, setGoodsSuccess} = mainSlice.actions;

export default mainSlice.reducer;
