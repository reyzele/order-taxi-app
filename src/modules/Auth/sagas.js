import { startSubmit, stopSubmit } from "redux-form";
import { put, call, takeLeading } from "redux-saga/effects";

import { login, auth } from "./actions";
import { checkAuth } from "config/api";

export function* authPostWorker({ payload }) {
  try {
    const result = yield call(checkAuth, payload);

    return result;
  } catch (error) {
    return { error: error.message };
  }
}

export function* authWorker(action) {
  yield put(startSubmit("loginform"));

  const { error, data } = yield call(authPostWorker, action);

  if (error) {
    yield put(
      stopSubmit("loginform", {
        userName: "Ошибка сети",
        userPassword: "Ошибка сети",
        _error: error
      })
    );
  } else if (!data.success) {
    yield put(
      stopSubmit("loginform", {
        userName: "Неверное имя пользователя или пароль",
        userPassword: "Неверное имя пользователя или пароль",
        _error: data.error
      })
    );
  } else if (data.success) {
    yield put(login());
  }
}

export function* authWatcher() {
  yield takeLeading(auth.toString(), authWorker);
}
