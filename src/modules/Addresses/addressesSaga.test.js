import { put, call } from "redux-saga/effects";
import {
  fetchAddressesRequest,
  fetchAddressesSuccess,
  fetchAddressesFailure
} from "./actions";
import { loadAddressList } from "config/api";
import { addressesWorker } from "./sagas";

describe("addressesWorker with error", () => {
  const gen = addressesWorker(fetchAddressesRequest);

  it("calls loadAddressList", () => {
    expect(gen.next().value).toEqual(call(loadAddressList));
  });

  it("puts fetchAddressesFailure with error", () => {
    expect(gen.next({ error: "test error" }).value).toEqual(
      put(fetchAddressesFailure("test error"))
    );
  });

  it("saga is finished", () => {
    expect(gen.next().done).toEqual(true);
  });
});

describe("addressesWorker with success", () => {
  const gen = addressesWorker(fetchAddressesRequest);
  const testAdresses = {
    data: { addresses: ["Пулково (LED)", "Волковское кладбище"] }
  };

  it("calls loadAddressList", () => {
    expect(gen.next().value).toEqual(call(loadAddressList));
  });

  it("puts fetchAddressesSuccess with result", () => {
    expect(gen.next(testAdresses).value).toEqual(
      put(fetchAddressesSuccess(testAdresses.data.addresses))
    );
  });

  it("saga is finished", () => {
    expect(gen.next().done).toEqual(true);
  });
});
