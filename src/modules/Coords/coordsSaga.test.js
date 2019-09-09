import { put, call } from "redux-saga/effects";

import { coordsWorker } from "./sagas";
import { fetchCoordsSuccess, fetchCoordsFailure } from "./actions";
import { loadCoords } from "config/api";

describe("coordsWorker with success", () => {
  const testAction = {
    type: "FETCH_COORDS_REQUEST",
    payload: {
      address1: "test1",
      address2: "test2"
    }
  };
  const gen = coordsWorker(testAction);
  const testCoords = { data: [[30, 50], [40, 60]] };

  it("calls loadCoords with action.payload", () => {
    expect(gen.next().value).toEqual(call(loadCoords, testAction.payload));
  });

  it("puts fetchCoordsSuccess with result", () => {
    expect(gen.next(testCoords).value).toEqual(
      put(fetchCoordsSuccess(testCoords.data))
    );
  });

  it("saga is finished", () => {
    expect(gen.next().done).toEqual(true);
  });
});

describe("coordsWorker with error", () => {
  const testAction = {
    type: "FETCH_COORDS_REQUEST",
    payload: {
      address1: "test1",
      address2: "test2"
    }
  };
  const gen = coordsWorker(testAction);

  it("calls loadCoords with action.payload", () => {
    expect(gen.next().value).toEqual(call(loadCoords, testAction.payload));
  });

  it("puts fetchCoordsFailure with error", () => {
    expect(gen.next({ error: "test error" }).value).toEqual(
      put(fetchCoordsFailure("test error"))
    );
  });

  it("saga is finished", () => {
    expect(gen.next().done).toEqual(true);
  });
});
