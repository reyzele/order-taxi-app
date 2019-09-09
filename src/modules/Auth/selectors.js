export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getProfile = state => state.auth.profile;
export const getIsProfileFilled = state =>
  Object.keys(state.auth.profile).length > 0;
