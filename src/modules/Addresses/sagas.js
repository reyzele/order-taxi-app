import { put, call, takeEvery } from "redux-saga/effects";
import {
  fetchAddressesRequest,
  fetchAddressesSuccess,
  fetchAddressesFailure
} from "./actions";
import { loadAddressList } from "config/api";

export function* addressesWorker() {
  try {
    const { error, data } = yield call(loadAddressList);
    if (!error) yield put(fetchAddressesSuccess(data.addresses));
    if (error) yield put(fetchAddressesFailure(error));
  } catch (error) {
    yield put(fetchAddressesFailure(error));
  }
}

export function* addressesWatcher() {
  yield takeEvery(fetchAddressesRequest.toString(), addressesWorker);
}
