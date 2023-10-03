import axios from "axios";

const baseDomain = "http://localhost:3000/";
const baseURL = `${baseDomain}api/`; // or `${baseDomain}/api/v1`

export default axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
  withCredentials: false,
});
