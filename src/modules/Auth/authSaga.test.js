import { startSubmit, stopSubmit } from "redux-form";
import { put, call } from "redux-saga/effects";

import { login, auth } from "modules/Auth";
import { checkAuth } from "config/api";
import { authWorker, authPostWorker } from "./sagas";

import mockAxios from "axios";

describe("Testing for proper operation authPostWorker saga", () => {
  const testAction = {
    type: "TEST_AUTH",
    payload: {
      username: "test username",
      password: "test password"
    }
  };

  const gen = authPostWorker(testAction);

  it("calls loadCoords with action.payload", () => {
    expect(gen.next().value).toEqual(call(checkAuth, testAction.payload));
  });

  it("saga is finished", () => {
    expect(gen.next().done).toEqual(true);
  });
});

describe("authWorker with net error", () => {
  const gen = authWorker(auth);
  const testError = { error: "test error" };
  const netErrorTemplate = {
    userName: "Ошибка сети",
    userPassword: "Ошибка сети",
    _error: testError.error
  };

  it("puts startSubmit", () => {
    expect(gen.next().value).toEqual(put(startSubmit("loginform")));
  });

  it("calls authPostWorker", () => {
    expect(gen.next().value).toEqual(call(authPostWorker, auth));
  });

  it("puts stopSubmit with error", () => {
    expect(gen.next(testError).value).toEqual(
      put(stopSubmit("loginform", netErrorTemplate))
    );
  });

  it("saga is finished", () => {
    expect(gen.next().done).toEqual(true);
  });
});

describe("authWorker with server error", () => {
  const gen = authWorker(auth);
  const testError = { data: { error: "test error" } };
  const errorTemplate = {
    userName: "Неверное имя пользователя или пароль",
    userPassword: "Неверное имя пользователя или пароль",
    _error: testError.data.error
  };

  it("puts startSubmit", () => {
    expect(gen.next().value).toEqual(put(startSubmit("loginform")));
  });

  it("calls authPostWorker", () => {
    expect(gen.next().value).toEqual(call(authPostWorker, auth));
  });

  it("puts stopSubmit with error", () => {
    expect(gen.next(testError).value).toEqual(
      put(stopSubmit("loginform", errorTemplate))
    );
  });

  it("saga is finished", () => {
    expect(gen.next().done).toEqual(true);
  });
});

describe("authWorker with success", () => {
  const gen = authWorker(auth);
  const testSuccess = { data: { success: true } };

  it("puts startSubmit", () => {
    expect(gen.next().value).toEqual(put(startSubmit("loginform")));
  });

  it("calls authPostWorker", () => {
    expect(gen.next().value).toEqual(call(authPostWorker, auth));
  });

  it("puts stopSubmit with success", () => {
    expect(gen.next(testSuccess).value).toEqual(put(login()));
  });

  it("saga is finished", () => {
    expect(gen.next().done).toEqual(true);
  });
});

describe("Axios api check", () => {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      success: true
    })
  );
  const user = {
    username: "test@test.com",
    password: "123123"
  };

  it("Check checkAuth api is work", async () => {
    const data = await checkAuth(user);

    expect(data.success).toBe(true);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      "https://loft-taxi.glitch.me/auth?username=test@test.com&password=123123",
      {
        method: "GET",
        mode: "cors"
      }
    );
  });
});
