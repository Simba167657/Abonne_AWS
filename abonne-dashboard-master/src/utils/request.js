import Axios from 'axios';

const BASE_URL = 'https://api.abonne.de/api/v1';
const request = Axios.create({
  baseURL: BASE_URL,
});
request.defaults.headers.common.authorization = `Bearer ${localStorage.getItem('token')}`;
export default request;
