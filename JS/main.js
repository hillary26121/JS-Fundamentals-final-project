// API KEY = 4e835435a3ded0ecd3bef3da14dbf091

(function () {
  let userInput = document.querySelector("#user-input");
  let searchResults = document.querySelector("#search-results");

  //This function pulls the 'id' of each movie for more info, posters, and IMDB links and creates the HTML elements and their classes/attributes and appends them to the page.

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

  //this function calls the API to return search results based on user input

  userInput.addEventListener("input", async () => {
    searchResults.textContent = "";

    let queries = await searchMovies(userInput);
    console.log(queries);
    queries.forEach(async (query) => {
      let movieDetails = await addMovie(query.id);
      appendData(movieDetails);
    });
  });
})();
