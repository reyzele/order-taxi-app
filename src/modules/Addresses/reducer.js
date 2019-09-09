import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchAddressesRequest,
  fetchAddressesSuccess,
  fetchAddressesFailure
} from "./actions";

const myAddresses = handleActions(
  {
    [fetchAddressesSuccess]: (_state, action) => action.payload
  },
  []
);

const isLoadingAddresses = handleActions(
  {
    [fetchAddressesRequest]: () => true,
    [fetchAddressesSuccess]: () => false,
    [fetchAddressesFailure]: () => false
  },
  null
);

const errorText = handleActions(
  {
    [fetchAddressesSuccess]: () => null,
    [fetchAddressesFailure]: () =>
      "Ошибка загрузки. Проверьте подключение к сети"
  },
  null
);

const error = handleActions(
  {
    [fetchAddressesSuccess]: () => null,
    [fetchAddressesFailure]: (_state, action) => action.payload
  },
  null
);

export default combineReducers({
  myAddresses,
  isLoadingAddresses,
  error,
  errorText
});
