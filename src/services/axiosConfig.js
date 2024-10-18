import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // Change to your server URL
});

export default instance;
