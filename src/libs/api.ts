import axios from "axios";

const API_ENDPOINT = "http://192.168.1.6:8000/api";

export default axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "secret-key": "PetSentryApp2023",
  },
});
