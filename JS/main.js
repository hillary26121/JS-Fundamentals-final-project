// API KEY = 4e835435a3ded0ecd3bef3da14dbf091

let button = document.querySelector("#button");
let titleArea = document.querySelector('#title-area');
let descriptionArea = document.querySelector('#des-area');

  async function getImages(){
     try {
        let response = await axios
        .get( 'https://api.themoviedb.org/3/movie/now_playing?api_key=4e835435a3ded0ecd3bef3da14dbf091&language=en-US&page=1')
    let movies = response.data.results;
        movies.forEach( (movie)=>{
            if(response){
               movie = movies[Math.floor(Math.random() * movies.length)]
               titleArea.textContent = movie.original_title;
               descriptionArea.textContent = movie.overview;
               


            }
        
        })

    
    
     console.log(response);
         
     } catch (error) {
         console.error(error);
     }
  }

button.addEventListener("click", getImages);

