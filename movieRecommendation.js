//Implement all your function here to make it a working application.
const apiKey = API_KEY;
const genreSelect = document.getElementById('genre-select');
const movieContainer = document.getElementById('movie-container');
let movies = [];
let currentMovieIndex = 0;

function fetchGenres() {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`, true);
	xhr.onload = function () {
		if (this.status === 200) {
			const response = JSON.parse(this.responseText);
			response.genres.forEach(genre => {
				const option = document.createElement('option');
				option.value = genre.id;
				option.textContent = genre.name;
				genreSelect.appendChild(option);
			});
		}
	};
	xhr.send();
}

function fetchMovies() {
	const genreId = genreSelect.value;
	if (!genreId) return;
	const xhr = new XMLHttpRequest();
	xhr.open('GET', `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`, true);
	xhr.onload = function () {
		if (this.status === 200) {
			const response = JSON.parse(this.responseText);
			movies = response.results;
			currentMovieIndex = 0;
			showMovie();
		}
	};
	xhr.send();
}

function showMovie() {
	if (movies.length === 0) return;
	const movie = movies[currentMovieIndex];
	movieContainer.innerHTML = `
		<h2>${movie.title}</h2>
		<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
		<p>${movie.overview}</p>
	`;
}

function showNextMovie() {
	if (movies.length === 0) return;
	currentMovieIndex = (currentMovieIndex + 1) % movies.length;
	showMovie();
}

fetchGenres();