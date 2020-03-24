import axios from 'axios';

/* eslint-disable */
let baseURL = 'http://localhost:5000/api';

// eslint-disable-next-line import/prefer-default-export
export const HTTP = axios.create(
  {
    baseURL: baseURL,
  });
