import { Component, OnInit } from '@angular/core';
import axios, { Axios } from 'axios';
import { PassThrough } from 'stream';

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

  //tmdb API
  tmdb_obj : any;
  tmbdArray : any = [];
  tmdb_movie_array : any = [];
  tmdb_tv_array : any = []
  tmdb_scrap_array : any = [];
  tmdb_new_array : any = []
  show_array : any;

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

  radioValue(){
    const movies = <HTMLInputElement> document.getElementById('radio_input1');
    const tv = <HTMLInputElement> document.getElementById('radio_input2');
    const all = <HTMLInputElement> document.getElementById('radio_input3');
    if(all.checked){
      this.show_array = this.tmdb_new_array;
    }
    else if(tv.checked){
      this.show_array = this.tmdb_tv_array;
    }
    else if(movies.checked){
      this.show_array = this.tmdb_movie_array;
    }
  }

  LoadMovie(searchTerm: any){
    searchTerm = this.search;
    this.description = false;
    if(this.search != ""){
      setTimeout(() => {
        this.show = true;
      }, 5000);

      const multiURL = `https://api.themoviedb.org/3/search/multi?api_key=1315531f53bb88b9f3c93447893c4b66&language=en-US&query=${searchTerm}&page=1&include_adult=false`

      this.loadAnimation();

      setTimeout(() => {
        // The tmdb api call
        axios.get(multiURL).then(response => {
          this.tmdb_obj = response;
          this.tmbdArray = response.data.results;

          for(let m = 0 ; m < this.tmbdArray.length ; m++){
            if(this.tmbdArray[m].media_type === 'movie'){
              this.tmdb_movie_array.push(this.tmbdArray[m]);
            }
            else if(this.tmbdArray[m].media_type === 'tv'){
              this.tmdb_tv_array.push(this.tmbdArray[m]);
            }
            else{
              this.tmdb_scrap_array.push(this.tmbdArray[m]);
            }
          }
          // Combining Two Arrays
          this.tmdb_new_array = this.tmdb_movie_array.concat(this.tmdb_tv_array);
          // No movie
          const newClass = document.querySelector(".noMovie");
          if(this.tmdb_new_array.length == 0){
            setTimeout(() => {
              newClass?.classList.add("noMovie--show");
            }, 500);
          }
          else{
            newClass?.classList.remove("noMovie--show");
          }
          // console.log(this.tmbdArray);  
          // console.log(this.tmdb_new_array);
          // console.log(this.tmdb_movie_array);
          // console.log(this.tmdb_tv_array);
          // console.log(this.tmdb_scrap_array);
        }).catch(err => {
          console.log(err);
        });
      }, 3000);
      this.tmdb_new_array.splice(0, this.tmdb_new_array.length);
      this.tmdb_movie_array.splice(0, this.tmdb_movie_array.length);
      this.tmdb_tv_array.splice(0, this.tmdb_tv_array.length);
      console.log(this.tmdb_movie_array.length);
    }
    else{
      this.noSearch();
    }
  }

  loadAnimation(){
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
  }

  noSearch(){
    const notify = document.querySelector(".notification");
    const searchbar = document.querySelector(".search"); 
    notify?.classList.add("notification--show");
    searchbar?.classList.add("shaking")
    setTimeout(() => {
      notify?.classList.remove("notification--show");
      searchbar?.classList.remove("shaking");
    }, 3000);
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
