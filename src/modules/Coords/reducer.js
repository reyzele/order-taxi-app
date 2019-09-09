import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchCoordsRequest,
  fetchCoordsSuccess,
  fetchCoordsFailure,
  setIsOrderMade
} from "./actions";

const coords = handleActions(
  {
    [fetchCoordsSuccess]: (_state, action) => action.payload,
    [fetchCoordsFailure]: () => null
  },
  null
);

const isLoadingCoords = handleActions(
  {
    [fetchCoordsRequest]: () => true,
    [fetchCoordsSuccess]: () => false,
    [fetchCoordsFailure]: () => false
  },
  false
);

const isOrderMade = handleActions(
  {
    [setIsOrderMade]: (_state, action) => action.payload
  },
  false
);

const error = handleActions(
  {
    [fetchCoordsSuccess]: () => null,
    [fetchCoordsFailure]: (_state, action) => action.payload
  },
  null
);

export default combineReducers({
  coords,
  isLoadingCoords,
  isOrderMade,
  error
});
