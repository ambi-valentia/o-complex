/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeEvery, all } from "redux-saga/effects";
import { getGoodsFailure, getGoodsSuccess, getReviewsFailure, getReviewsSuccess, setGoodsLoading } from "./reducers/main.slice";
import { fetchGoods, fetchReviews } from "../api";
import { PayloadAction } from "@reduxjs/toolkit";
import { GoodsAction } from "../types/main";

function* getReviewsFetch(): any {
  try {
    const reviews = yield call(fetchReviews);
    yield put(getReviewsSuccess(reviews));
  } catch (e) {
    yield put(getReviewsFailure(e));
  }
}

function* getGoodsFetch(action: PayloadAction<GoodsAction>): any {
  yield put(setGoodsLoading());
  try {
    const goods = yield call(fetchGoods, action.payload.page);
    yield put(getGoodsSuccess(goods.data.products));
  } catch (e) {
    yield put(getGoodsFailure(e));
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
