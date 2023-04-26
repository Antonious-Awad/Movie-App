
let movieNameRef=document.getElementById('movie-name');
let searchBtn = document.getElementById('search-btn');
let result = document.getElementById('result');


//fetch movie

let getMovie = ()=>{
  let movieName = movieNameRef.value;
  let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`
  //if search box is empty
  if (movieName <=0){
    result.innerHTML = `<h3 class="msg">Please enter a movie or a series name</h3>`
  }
  // if search box isn't empty
  else{
    fetch(url).then((response)=>response.json()).then((data)=>{
        // if movie / series exist
        if(data.Response == "True"){
          result.innerHTML = `
            <div class="info">
              <img src=${data.Poster} class="poster">
              <div>
                <h2>${data.Title}</h2>
                <div class="rating">
                  <img src="./star-icon.svg">
                  <h4>${data.imdbRating}</h4>
                </div>
                <div class="details">
                  <span>${data.Rated}</span>
                  <span>${data.Year}</span>
                  <span>${data.Runtime}</span>
                </div>
                <div class=genre>
                  <div>
                    ${data.Genre.split(",").join("</div><div>")}
                  </div>
                </div>
              </div>
            </div>
            <h3>Plot: </h3>
            <p>
              ${data.Plot}
            </p>
            <h3>Cast: </h3>
            <p>
              ${data.Actors}
            </p>
          `;
        }
        // if movie doesn't exist
        else{
          result.innerHTML=`
            <h3 class="msg">${data.Error}</h3>
          `
        }
        // if error occurs
    }).catch(()=>{
      result.innerHTML=`<h3 class="msg">Error Occured</h3>`;
    });
  }
}

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);