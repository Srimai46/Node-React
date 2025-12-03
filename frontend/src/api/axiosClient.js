import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:4000/api',
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // optional: redirect to login
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
