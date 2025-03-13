import axios from "axios";

// const baseURL = "https://logbookbackend.up.railway.app/api";
const baseURL = "http://localhost:8000/api";
const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
