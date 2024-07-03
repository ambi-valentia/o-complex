import { RootState } from "../store";

export const selectReviews = (state: RootState) => state.mainReducer.reviews;
export const selectReviewsLoading = (state: RootState) => state.mainReducer.reviewsLoading;
export const selectGoods = (state: RootState) => state.mainReducer.goods;
export const selectGoodsLoading = (state: RootState) => state.mainReducer.goodsLoading;