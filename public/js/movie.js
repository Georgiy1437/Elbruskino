async function getInfo(movieId) {
  const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}`, {
    headers: {
      'X-API-KEY': 'a9f8e0d7-60be-4c71-ba9d-4ae4456fae5c',
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

async function getVideo(movieId) {
  const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}/videos`, {
    headers: {
      'X-API-KEY': 'a9f8e0d7-60be-4c71-ba9d-4ae4456fae5c',
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

async function fetchMovieData(filmId) {
  const image = document.querySelector('.img');
  const rating = document.querySelector('#rating');
  const plot = document.querySelector('#plot');
  const length = document.querySelector('#length');
  const year = document.querySelector('#year');
  const video = document.querySelector('#video');

  const response = await getInfo(filmId);
  console.log(response);
  image.src = response.posterUrl;
  plot.innerText = 'Описание фильма: ' + response.description;
  rating.innerText = "Рейтинг кинопоиск: " + response.ratingKinopoisk;
  length.innerText = "Длительность фильма: " + response.filmLength + " минуты";
  year.innerText = response.year + " года";
  video.innerHTML = `<a href="${response.webUrl}">
  <h id="link">Тут можно посмотреть трейлер фильма</h>
</a>`;
}
