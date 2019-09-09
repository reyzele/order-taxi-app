import { combineReducers } from "redux";
import { spawn } from "redux-saga/effects";

import { reducer as form } from "redux-form";
import auth, { authWatcher, localStorageSaga } from "./Auth";
import addresses, { addressesWatcher } from "./Addresses";
import coords, { coordsWatcher } from "./Coords";

export default combineReducers({ auth, addresses, coords, form });

export function* rootSaga() {
  yield spawn(authWatcher);
  yield spawn(addressesWatcher);
  yield spawn(coordsWatcher);
  yield spawn(localStorageSaga);
}
