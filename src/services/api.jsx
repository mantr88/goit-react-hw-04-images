import axios from 'axios';

const KEY = '36141153-03c26a22f051b013ba3a47773';
axios.defaults.baseURL = `https://pixabay.com/api/`;

export const fetchGalery = (query, page = 1) => {
  const response = axios.get(
    `?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=15`
  );
  return response;
};
