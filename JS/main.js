(function () {
  let userInput = document.querySelector("#user-input");
  let searchResults = document.querySelector("#search-results");
  let nowPlayingButton = document.querySelector("#now-playing-button");
  let nowPlayingTitle = document.querySelector("#now-playing-title");
  let nowPlayingDescription = document.querySelector(
    "#now-playing-description"
  );

  const appendData = (movieDetails) => {
    let curMovieInfo = document.createElement("div");
    curMovieInfo.setAttribute("class", "movie-info");
    searchResults.appendChild(curMovieInfo);

    let curAnchor = document.createElement("a");
    curAnchor.setAttribute(
      "href",
      `https://imdb.com/title/${movieDetails.data.imdb_id}`
    );
    curAnchor.setAttribute("target", "_blank");
    curAnchor.setAttribute("class", "imdb-link");
    curMovieInfo.appendChild(curAnchor);

    let curTitle = document.createElement("div");
    curTitle.setAttribute("class", "movie-title");
    curTitle.textContent = movieDetails.data.original_title;

    curAnchor.appendChild(curTitle);
    let curImage = document.createElement("img");
    if (movieDetails.data.poster_path) {
      curImage.setAttribute("class", "movie-poster");
      curImage.setAttribute(
        "src",
        `https://image.tmdb.org/t/p/w500${movieDetails.data.poster_path}`
      );
    } else {
      curImage.setAttribute("src", "https://via.placeholder.com/420x630.png");
      curImage.setAttribute("class", "movie-poster");
    }

    curAnchor.appendChild(curImage);
  };

  userInput.addEventListener("input", async () => {
    searchResults.textContent = "";

    let queries = await searchMovies(userInput);
    console.log(queries);
    queries.forEach(async (query) => {
      let movieDetails = await addMovie(query.id);
      appendData(movieDetails);
    });
  });

  nowPlayingButton.addEventListener("click", async () => {
    let chosenMovies = await nowPlaying();
    chosenMovies.forEach((movie) => {
      movie = chosenMovies[Math.floor(Math.random() * chosenMovies.length)];
      console.log(movie);
      nowPlayingTitle.textContent = movie.original_title;
      nowPlayingDescription.textContent = movie.overview;
    });
  });
})();
