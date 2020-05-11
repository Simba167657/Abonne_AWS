import Axios from "axios";

const BASE_URL = "https://api.abonne.net/api/v1";
const request = Axios.create({
  baseURL: BASE_URL,
});
export default request;
