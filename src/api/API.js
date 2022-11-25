import axios from "axios";
import endpoints from "./Endpoints";

const API = axios.create({
  baseURL: `${endpoints.serverBaseUrl}/api/v1`,
});

export default API;
