//import { http } from "./instance";
import axios from "axios";

export const checkAuth = async ({ username, password }) => {
  const response = await axios.get(
    `https://order-taxi-app.glitch.me/auth?username=${username.trim()}&password=${password.trim()}`,
    {
      method: "GET",
      mode: "cors"
    }
  );

  return response;
};

export const loadAddressList = () => {
  return axios
    .get("https://order-taxi-app.glitch.me/addressList", {
      method: "GET",
      mode: "cors"
    })
    .then(response => response);
};

export const loadCoords = ({ address1, address2 }) => {
  return axios
    .get(
      `https://order-taxi-app.glitch.me/route?address1=${address1}&address2=${address2}`,
      {
        method: "GET",
        mode: "cors"
      }
    )
    .then(response => response);
};
