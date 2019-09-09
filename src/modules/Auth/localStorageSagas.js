import { spawn, takeLeading, takeEvery } from "redux-saga/effects";
import {
  handleProfileSubmit,
  handleProfileClear,
  logout,
  login
} from "./actions";

function saveProfileWorker(action) {
  localStorage.state = JSON.stringify({
    ...JSON.parse(localStorage.state),
    profile: action.payload
  });
}

function clearProfileWorker() {
  localStorage.state = JSON.stringify({
    ...JSON.parse(localStorage.state),
    profile: {}
  });
}

function logoutWorker() {
  const state = localStorage.state && JSON.parse(localStorage.state);

  localStorage.state = JSON.stringify({
    isLoggedIn: false,
    profile: state ? { ...state.profile } : {}
  });
}

function loginWorker() {
  const state = localStorage.state && JSON.parse(localStorage.state);

  localStorage.state = JSON.stringify({
    isLoggedIn: true,
    profile: state ? { ...state.profile } : {}
  });
}

function* saveProfileWatcher() {
  yield takeLeading(handleProfileSubmit.toString(), saveProfileWorker);
}

function* clearProfileWatcher() {
  yield takeLeading(handleProfileClear.toString(), clearProfileWorker);
}

function* logoutWatcher() {
  yield takeEvery(logout.toString(), logoutWorker);
}

function* loginWatcher() {
  yield takeEvery(login.toString(), loginWorker);
}

export function* localStorageSaga() {
  yield spawn(saveProfileWatcher);
  yield spawn(clearProfileWatcher);
  yield spawn(logoutWatcher);
  yield spawn(loginWatcher);
}
