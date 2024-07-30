// src/services/api.js
import axios from 'axios';

const API_KEY = '8c22c2ee'; // Replace with your actual API key
const BASE_URL = 'http://www.omdbapi.com/';

export const fetchMovies = async (query, page = 1, year = '', type = '') => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: query,
      page,
      y: year,
      type,
    },
  });
  return response.data;
};

export const fetchMovieDetails = async (imdbID) => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: imdbID,
    },
  });
  return response.data;
};

export const fetchSimilarMovies = async (title) => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: title,
    },
  });
  return response.data;
};