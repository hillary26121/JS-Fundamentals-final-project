(function () {
  let appDescription = document.querySelector("#app-description");
  async function addMovie(id) {
    try {
      let movieDetails = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=4e835435a3ded0ecd3bef3da14dbf091&language=en-US`
      );
      return movieDetails;
    } catch (error) {
      appDescription.textContent =
        "Whoops, looks like there's a problem. We are working on ourselves right now, try again later. It's not you, it's us.";
      console.error(error);
      return error;
    }
  }

  async function searchMovies(userInput) {
  if(userInput.value){
    try {
      let searchResponse = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=4e835435a3ded0ecd3bef3da14dbf091&language=en-US&query=${userInput.value}&page=1&include_adult=false`
      );
      let queries = searchResponse.data.results;
      return queries;
    } catch (error) {
      appDescription.textContent =
        "Whoops, looks like there's a problem. We are working on ourselves right now, try again later. It's not you, it's us.";
      console.error(error);
      return error;
    }
  }
  }

  async function nowPlaying() {
    try {
      let nowPlayingMovies = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=4e835435a3ded0ecd3bef3da14dbf091&language=en-US&page=1"
      );
      let chosenMovies = nowPlayingMovies.data.results;
      return chosenMovies;
    } catch (error) {
      appDescription.textContent =
        "Whoops, looks like there's a problem. We are working on ourselves right now, try again later. It's not you, it's us.";
      console.error(error);
      return error;
    }
  }

  window.addMovie = addMovie;
  window.searchMovies = searchMovies;
  window.nowPlaying = nowPlaying;
})();
