import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  //   withXSRFToken: true,
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Referer: "https://hospital.betweenframes.net",
  },
});

export default instance;
