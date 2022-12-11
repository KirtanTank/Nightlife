import { Component, OnInit } from '@angular/core';
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
  firstArray : any;
  //tmdb poster
  tmdb_poster : any = "https://image.tmdb.org/t/p/w500/";

  //TMDB API
  tmdb_obj : any;
  tmbdArray : any = [];
  tmdb_movie_array : any = [];

  id : any;
  year : any;
  name : any;
  poster : any;
  overview : any;
  rate : any;
  language: any;
  popularity : any;
  type : any;
  path : any;

  description : boolean = false;
  show : boolean = false;
  loader : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  LoadMovie(searchTerm: any){
    searchTerm = this.search;
    this.description = false;
    if(this.search != ""){
      setTimeout(() => {
        this.show = true;
      }, 5000);

      const multiURL = `https://api.themoviedb.org/3/search/multi?api_key=1315531f53bb88b9f3c93447893c4b66&language=en-US&query=${searchTerm}&page=1&include_adult=false`


      // Loading Animation
      const a = document.querySelector('.load--hidden');
      a?.classList.remove("load--hidden");
      a?.classList.add("load");

      setTimeout(() => {
        a?.classList.remove("load");
        a?.classList.add("load--hidden");
      }, 3000);
      a?.addEventListener("transitioned", ()=>{
        document.body.removeChild(a);
      });

      setTimeout(() => {
        // The tmdb api call
        axios.get(multiURL).then(response => {
          // tmdb
          this.tmdb_obj = response;
          this.tmbdArray = response.data.results;

          for(let m = 0 ; m < this.tmbdArray.length ; m++){
            if(this.tmbdArray[m].media_type === 'movie'){
              this.tmdb_movie_array.push(this.tmbdArray[m]);
            }
          }
          // No movie
          const newClass = document.querySelector(".noMovie");
            if(this.tmdb_movie_array.length == 0){
              setTimeout(() => {
                newClass?.classList.add("noMovie--show");
              }, 500);
            }
            else{
              newClass?.classList.remove("noMovie--show");
            }  
          console.log(this.tmdb_movie_array);
        }).catch(err => {
          console.log(err);
        });
      }, 3000);
      this.tmdb_movie_array.splice(0, this.tmdb_movie_array.length);
      console.log(this.tmdb_movie_array.length);
    }    
    else{
      alert("NO SEARCH");
    }
  }
  
  pop(){
    this.description = true;
    for(let p = 0 ; p < this.tmdb_movie_array.length ; p++){
      if(this.tmdb_movie_array[p].id === this.id){
        this.name = this.tmdb_movie_array[p].title;
        this.year = this.tmdb_movie_array[p].release_date;
        this.poster = `https://image.tmdb.org/t/p/w500/${this.tmdb_movie_array[p].poster_path}`;
        this.path = this.tmdb_movie_array[p].poster_path;
        this.overview = this.tmdb_movie_array[p]?.overview;
        this.rate = this.tmdb_movie_array[p].vote_average;
        this.language = this.tmdb_movie_array[p].original_language;
        this.popularity = this.tmdb_movie_array[p].popularity;
        this.type = this.tmdb_movie_array[p].media_type;
      }
    }
  }

  getId(movieId : any){
    this.id = movieId;
  }

  displayPoster(posterpath : any){
      return `https://image.tmdb.org/t/p/w500/${posterpath}`;
  }

}
