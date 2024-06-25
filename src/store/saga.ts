/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeEvery, all } from "redux-saga/effects";
import { setGoodsFailure, setGoodsLoading, setGoodsSuccess, setReviewsFailure, setReviewsLoading, setReviewsSuccess } from "./reducers/main.slice";
import { fetchGoods, fetchReviews } from "../api";
import { PayloadAction } from "@reduxjs/toolkit";
import { GoodsAction } from "../types/main";

function* getReviewsFetch(): any {
  yield put(setReviewsLoading());
  try {
    const reviews = yield call(fetchReviews);
    yield put(setReviewsSuccess(reviews));
  } catch (e) {
    yield put(setReviewsFailure(e));
  }
}

function* getGoodsFetch(action: PayloadAction<GoodsAction>): any {
  yield put(setGoodsLoading());
  try {
    const goods = yield call(fetchGoods, action.payload.page);
    yield put(setGoodsSuccess(goods.data.products));
  } catch (e) {
    yield put(setGoodsFailure(e));
  }
}

function* reviewsWatcher() {
  yield takeEvery("main/getReviews", getReviewsFetch);
}

function* goodsWatcher() {
  yield takeEvery("main/getGoods", getGoodsFetch);
}


export function* rootWatcher() {
  yield all([reviewsWatcher(), goodsWatcher()]);
}
