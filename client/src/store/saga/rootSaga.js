import { all, fork } from "redux-saga/effects";
import { watchAuthAction } from "./authSaga";
import { watchDataAction } from "./dataSaga";

export default function* rootSaga() {
  yield all([
    fork(watchAuthAction),
    fork(watchDataAction)
  ]);
}