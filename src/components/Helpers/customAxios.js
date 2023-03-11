import axios from "axios";

export const BASE_URL = "https://dogsapi.origamid.dev/json";

axios.defaults.baseURL = BASE_URL;

const accessToken = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = accessToken ? `Bearer ${accessToken}` : "";

export default axios;
