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
      curImage.setAttribute("src", "https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg");
      curImage.setAttribute("class", "movie-poster");
      curImage.setAttribute("class", "no-image")
    }

    curAnchor.appendChild(curImage);
  };

  userInput.addEventListener("input", async () => {
    let queries = await searchMovies(userInput);
    queries.forEach(async (query) => {
      searchResults.textContent = null;
      let movieDetails = await addMovie(query.id);
      appendData(movieDetails);
    });
  });

  nowPlayingButton.addEventListener("click", async () => {
    let chosenMovies = await nowPlaying();
      movie = chosenMovies[Math.floor(Math.random() * chosenMovies.length)];
      nowPlayingTitle.textContent = movie.original_title;
      nowPlayingDescription.textContent = movie.overview;
      
  });
})();
// https://via.placeholder.com/420x630.png