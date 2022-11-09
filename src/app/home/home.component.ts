import { Component, OnInit } from '@angular/core';
import { PopUpComponent } from '../pop-up/pop-up.component';
import axios, { Axios } from 'axios';
import { Stream } from 'stream';


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
  // poster : any = "https://www.themoviedb.org/t/p/w220_and_h330_face";

  comp = PopUpComponent;
  // internal = document.querySelector('internal')?.addEventListener('click', this.pop);
  description : boolean = false;
  show : boolean = false;
  loader : boolean = true;

  pop(){
    this.description = true;
    this.comp = PopUpComponent;
  }
  constructor() { }

  ngOnInit(): void {
  }

  LoadMovie(searchTerm: any){
    searchTerm = this.search;
    setTimeout(() => {
      this.show = true;
    }, 5000);
    // const URL = `http://www.omdbapi.com/?s=${searchTerm}&apikey=266b4fd8`;
    // const URL = `https://api.themoviedb.org/3/movie/popular?api_key=1315531f53bb88b9f3c93447893c4b66&language=en-US&page=1`;
    // axios.get(URL).then(response => {
    //     this.array = response.data.results;
      
    // }).catch(err => {
    //   console.log(err);
    // });

    const a = document.querySelector('.load--hidden');

    a?.classList.remove("load--hidden");
    a?.classList.add("load");

    setTimeout(() => {
      a?.classList.remove("load");
      a?.classList.add("load--hidden");
    }, 3000);
    a?.addEventListener("transitioned", ()=>{
      document.body.removeChild(a);
    })

    const options = {
      method: 'GET',
      url: 'https://imdb8.p.rapidapi.com/auto-complete',
      params: {q: searchTerm},
      headers: {
        'X-RapidAPI-Key': 'aa1ab1bbb3msh5297edcd4ffe1c0p19ae55jsnfaef7c87634a',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    };
    setTimeout(() => {
      axios.request(options).then((response : any) => {
        this.array = response.data.d;
        console.log(this.array);
      }).catch((err : any) => {
        console.error(err);
      });  
    }, 3000);
  }
  

  displayPoster(posterpath : any){
      return posterpath;
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
