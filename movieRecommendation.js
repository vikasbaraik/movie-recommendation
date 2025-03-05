//Implement all your function here to make it a working application.
require('dotenv').config();
const genresDropdown = document.getElementById("genres");
const playBtn = document.getElementById("playBtn");
const likeBtn = document.getElementById("likeBtn");
const moviePoster = document.getElementById("moviePoster");
const movieText = document.getElementById("movieText");
const likeOrDislikeBtns = document.getElementById("likeOrDislikeBtns");

const apiKey = API_KEY; // Load API key from config.js
let movies = [];
let currentMovieIndex = 0;

// Fetch genres from TMDB API
function fetchGenres() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`, true);
    xhr.onload = function () {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            response.genres.forEach(genre => {
                const option = document.createElement("option");
                option.value = genre.id;
                option.textContent = genre.name;
                genresDropdown.appendChild(option);
            });
        }
    };
    xhr.send();
}

// Fetch movies based on selected genre
function fetchMovies() {
    const genreId = genresDropdown.value;
    if (!genreId) return;
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`, true);
    xhr.onload = function () {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            movies = response.results;
            currentMovieIndex = 0;
            displayMovie();
        }
    };
    xhr.send();
}

// Display movie details
function displayMovie() {
    if (movies.length === 0) return;
    const movie = movies[currentMovieIndex];
    moviePoster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">`;
    movieText.innerHTML = `<h2>${movie.title}</h2><p>${movie.overview}</p>`;
    likeOrDislikeBtns.hidden = false;
}

// Show next movie
function showNextMovie() {
    if (movies.length === 0) return;
    currentMovieIndex = (currentMovieIndex + 1) % movies.length;
    displayMovie();
}

// Event Listeners
playBtn.addEventListener("click", fetchMovies);
likeBtn.addEventListener("click", showNextMovie);

// Initialize genres on page load
fetchGenres();