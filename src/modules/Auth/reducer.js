import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  login,
  logout,
  handleProfileSubmit,
  handleProfileClear
} from "./actions";

const isLoggedIn = handleActions(
  {
    [login]: () => true,
    [logout]: () => false
  },
  false
);

const profile = handleActions(
  {
    [handleProfileSubmit]: (_, action) => action.payload,
    [handleProfileClear]: () => ({})
  },
  {}
);

export default combineReducers({
  isLoggedIn,
  profile
});
