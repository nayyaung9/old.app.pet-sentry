import axios from "axios";
import { getAuthToken } from "~/utils/storage";

const API_ENDPOINT = "http://192.168.1.5:8000/api";

const instance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "secret-key": "PetSentryApp2023",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const { token } = await getAuthToken();
    config.headers["x-access-token"] = `${token}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default instance;
