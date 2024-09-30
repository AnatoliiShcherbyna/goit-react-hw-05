import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const API_READ_ACCESS_TOKEN =
  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmNkMTY3ZDRhZDE3NDE1NzIyYWM4YjkxNWNiN2Q4YyIsIm5iZiI6MTcyNzQ1NjQ5Mi4zMTc4MTEsInN1YiI6IjY2ZjZlMWVhNmM5YTY4MTU1MDcwZTI3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KzppSI8RqeEnS6uGXu-Qnkxn7FTXNdSfXa-5jKQUoF0;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  },
});

export const getTrendingMovies = async () => {
  const { data } = await api.get('/trending/movie/day');
  return data.results;
};

export const searchMovies = async query => {
  const { data } = await api.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return data.results;
};

export const getMovieDetails = async movieId => {
  const { data } = await api.get(`/movie/${movieId}`);
  return data;
};

export const getMovieCredits = async movieId => {
  const { data } = await api.get(`/movie/${movieId}/credits`);
  return data.cast;
};

export const getMovieReviews = async movieId => {
  const { data } = await api.get(`/movie/${movieId}/reviews`);
  return data.results;
};

export const fetchByGenre = async genreId => {
  const { data } = await api.get('/discover/movie', {
    params: {
      with_genres: genreId,
    },
  });
  return data.results;
};

export const getMovieImageUrl = (path, size = 'w500') => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
