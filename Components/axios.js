/* eslint-disable prettier/prettier */
import axios from 'axios';
// export const BASE_URI = 'https://digital-village.herokuapp.com';
export const BASE_URI = 'http://192.168.0.167:5000';

export default axios.create({
  baseURL: BASE_URI,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URI,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
});
