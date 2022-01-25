const API_KEY = 'a9f8e0d7-60be-4c71-ba9d-4ae4456fae5c';
function displayMovies(data) {
  const moviesEl = document.querySelector('.newfilm');

  document.querySelector('.newfilm').innerHTML = '';

  data.films.forEach(movie => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('films');
    movieEl.innerHTML = `
              <img src="${movie.posterUrl}" alt="no photo">
        <div class="info">
          <div class ="rating">
          <span>${movie.rating}</span>
          </div>
          <a href="/movie/${movie.filmId}">
          <div class ="namefilm">${movie.nameRu}</div>
          </a>
          <div class ="datafilm">${movie.year} ${movie.genres.map(genre => ` ${genre.genre}`).slice(0, 3)}</div>
        </div>
        `;
    console.log(movie);
    moviesEl.appendChild(movieEl);
  });
}

async function getMovies(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data);
  displayMovies(data);
}
