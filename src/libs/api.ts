import axios from "axios";
import { getAuthToken } from "~/utils/storage";

const environment = "release";

const API_ENDPOINT = {
  development: "http://192.168.1.5:8000/api",
  release: "http://13.233.76.94:8000/api",
};

const instance = axios.create({
  baseURL: API_ENDPOINT[environment],
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
