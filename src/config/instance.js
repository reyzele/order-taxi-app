import axios from "axios";

export const http = axios.create({
  baseURL: "https://loft-taxi.glitch.me"
});
