const API_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

const form = document.querySelector('form');
const search = document.querySelector('.search');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const ApiSearchUrl = `${API_SEARCH}${search.value}`;

  if (search.value) {
    getMovies(ApiSearchUrl);

    search.value = '';
  }
});
