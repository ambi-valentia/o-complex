/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeEvery, all } from "redux-saga/effects";
import { getReviewsFailure, getReviewsSuccess } from "./reducers/main.slice";
import { fetchReviews } from "../api";

function* getReviewsFetch(): any {
  try {
    const reviews = yield call(fetchReviews);
    yield put(getReviewsSuccess(reviews));
  } catch (e) {
    yield put(getReviewsFailure(e));
  }
}

function* reviewsWatcher() {
  yield takeEvery("main/getReviews", getReviewsFetch);
}


export function* rootWatcher() {
  yield all([reviewsWatcher()]);
}
