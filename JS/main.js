// API KEY = 4e835435a3ded0ecd3bef3da14dbf091

(function () {
  let userInput = document.querySelector("#user-input");
  let searchResults = document.querySelector("#search-results");


  async function addMovie(id){
    let movieDetails = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e835435a3ded0ecd3bef3da14dbf091&language=en-US`
    )

    console.log(movieDetails.data);
    console.log(movieDetails.data.imdb_id);

    let curMovieInfo = document.createElement("div");
    curMovieInfo.setAttribute("class", "movie-info");
    searchResults.appendChild(curMovieInfo);

    let curAnchor = document.createElement("a");
    curAnchor.setAttribute("href", `https://imdb.com/title/${movieDetails.data.imdb_id}`);
    curAnchor.setAttribute("target", "_blank");
    curAnchor.setAttribute("class", "imdb-link")
    curMovieInfo.appendChild(curAnchor);

    let curTitle = document.createElement("div");
    curTitle.setAttribute("class", "movie-title");
    curTitle.textContent = movieDetails.data.original_title;

    curAnchor.appendChild(curTitle);

    let curImage = document.createElement("img");
    curImage.setAttribute("class", "movie-poster");
    curImage.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500${movieDetails.data.poster_path}`
    );

    curAnchor.appendChild(curImage);
  }
  //this function calls the API to return search results based on user input

  userInput.addEventListener("input", () => {
    searchResults.textContent = "";
    async function searchMovies() {
      try {
        let searchResponse = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=4e835435a3ded0ecd3bef3da14dbf091&language=en-US&query=${userInput.value}&page=1&include_adult=false`
        );
        let queries = searchResponse.data.results;
        queries.forEach((query) => {
          addMovie(query.id)
        });

      } catch (error) {
        console.error(error);
      }
    }

    searchMovies();
  });
})();
