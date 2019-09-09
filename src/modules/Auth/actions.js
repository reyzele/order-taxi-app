import { createAction } from "redux-actions";

export const login = createAction("LOGIN");
export const logout = createAction("LOGOUT");
export const auth = createAction("AUTH");

export const handleProfileSubmit = createAction("HANDLE_PROFILE_SUBMIT");
export const handleProfileClear = createAction("HANDLE_PROFILE_CLEAR");
