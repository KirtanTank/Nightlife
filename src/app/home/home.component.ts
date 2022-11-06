import { Component, OnInit } from '@angular/core';
import { PopUpComponent } from '../pop-up/pop-up.component';
import axios, { Axios } from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  search : any = "";
  searchcon : any = document.querySelector('.search-container');
  page : any = 1
  perPage : any = 4
  array : any;
  poster : any = "https://www.themoviedb.org/t/p/w220_and_h330_face";

  comp = PopUpComponent;
  internal = document.querySelector('internal')?.addEventListener('click', this.pop);
  ok : boolean = false;

  pop(){
    this.ok = true;
    this.comp = PopUpComponent;
  }
  constructor() { }

  ngOnInit(): void {
  }

  LoadMovie(searchTerm: any){
    searchTerm = this.search;
    // const URL = `http://www.omdbapi.com/?s=${searchTerm}&apikey=266b4fd8`;
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=1315531f53bb88b9f3c93447893c4b66&language=en-US&page=1`;
    axios.get(URL).then(response => {
        this.array = response.data.results;
      
    }).catch(err => {
      console.log(err);
    });
  }

  displayPoster(posterpath : any){
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`;
  }

  // displayMovie(movies : any){
  //   for(let idx = 0 ; idx < movies.length ; idx++){

  //     if(movies[idx].Poster !== "N/A"){
  //       var mo = movies[idx].Poster;
  //     }
  //     else{
  //       mo = "poster.jpg";
  //     }
  //   }
  //   this.MovieDetails(event?.target);
  // }

  // async MovieDetails(movie : any){
  //   const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=266b4fd8`);
  //   const movieDetails = await result.json();
  //   console.log(movieDetails); 
  //   this.info(movieDetails);
  // }

  // info(movie : any){
  //   movie.innerHTML = `
  //     <div class="result">

  //     <div class="poster">
  //       <img src="${(movie.Poster !== "N/A") ? movie.Poster : 'poster.jpg'}" class="movie">
  //     </div>

  //     <div class="information">
  //         <h3 class="MovieTitle"><b>Title:</b>${movie.Title}</h3>
  //         <p class="year"><b>Year:</b>${movie.Year}</p>
  //         <p class="rate"><b>Ratings:</b>${movie.Rated}</p>
  //         <p class="release"><b>Released:</b> ${movie.Released}</p>
  //         <p class="genre"><b>Genre:</b> ${movie.Genre}</p>
  //         <p class="writer"><b>Writer:</b> ${movie.Writer}</p>
  //         <p class="actors"><b>Actors: </b> ${movie.Actors}</p>
  //         <p class="plot"><b>Plot:</b> ${movie.Plot}</p>
  //         <p class="languages"><b>Languages:</b> ${movie.Language}</p>
  //         <p class="awards"><b>Awards:</b> ${movie.Awards}</p>
  //     </div>
  //   </div>`;
  // }


}
