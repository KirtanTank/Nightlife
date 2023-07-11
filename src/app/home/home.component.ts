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
  crew_obj : any;
  tmbdArray : any = [];
  tmdb_movie_array : any = [];
  tmdb_tv_array : any = []
  tmdb_scrap_array : any = [];
  tmdb_new_array : any = []
  show_array : any = this.tmdb_new_array;

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
  movie_info : boolean = false;
  tv_info : boolean = false;
  all_info : boolean = false;
  closed : boolean = true;

  radio_value : any;

  radioValue(){
    const movies = <HTMLInputElement> document.getElementById('radio_input1');
    const tv = <HTMLInputElement> document.getElementById('radio_input2');
    const all = <HTMLInputElement> document.getElementById('radio_input3');
    if(all.checked){
      this.all_info = true;
      this.movie_info = false;
      this.tv_info = false;
      this.show_array = this.tmdb_new_array;
      this.radio_value = all.value;
      // console.log(this.show_array);
    }
    else if(tv.checked){
      this.tv_info = true;
      this.movie_info = false;
      this.all_info = false;
      this.show_array = this.tmdb_tv_array;
      this.radio_value = tv.value;
      // console.log(this.show_array);
      // console.log(this.radio_value);
    }
    else if(movies.checked){
      this.movie_info = true;
      this.tv_info = false;
      this.all_info = false;
      this.show_array = this.tmdb_movie_array;
      this.radio_value = movies.value;
      // console.log(this.show_array);
      // console.log(this.radio_value);
    }
  }

  LoadMovie(searchTerm: any){
    searchTerm = this.search;
    this.description = false;
    const add_radio = document.querySelector(".genre--hidden")!;
    const parent = document.querySelector(".search-container")!;
    if(this.search != ""){
      setTimeout(() => {
        this.show = true;
      }, 5000);
      // Check the radio value
      this.radioValue();  
      // Load Animation
      this.loadAnimation();
      // Enable the radio buttons
      this.closed = false;
      add_radio?.classList.add("genre-choose");

      const multiURL = `https://api.themoviedb.org/3/search/multi?api_key=1315531f53bb88b9f3c93447893c4b66&language=en-US&query=${searchTerm}&page=1&include_adult=false`

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
          // console.log(this.radio_value);
          // Combining Two Arrays
          this.tmdb_new_array = this.tmdb_movie_array.concat(this.tmdb_tv_array);
          // No movie
          // console.log(this.all_info, this.movie_info, this.tv_info);
          // console.log(this.tmdb_tv_array);
          const newClass = document.querySelector(".noMovie");
          if((this.tmdb_movie_array.length == 0) && this.radio_value == "Movies"){
            setTimeout(() => {
              newClass?.classList.add("noMovie--show");
            }, 500);
          }
          else{
            newClass?.classList.remove("noMovie--show");
          }
          if((this.tmdb_tv_array.length == 0) && this.radio_value == "TvSeries"){
            setTimeout(() => {
              newClass?.classList.add("noMovie--show");
            }, 500);
          }
          else{
            newClass?.classList.remove("noMovie--show");
          }
          this.show_array = this.tmdb_new_array;
          // console.log(this.tmdb_new_array);
        }).catch(err => {
          console.log(err);
        });
      }, 3000);
      this.tmdb_new_array.splice(0, this.tmdb_new_array.length);
      this.tmdb_movie_array.splice(0, this.tmdb_movie_array.length);
      this.tmdb_tv_array.splice(0, this.tmdb_tv_array.length);
      this.tmdb_scrap_array.splice(0, this.tmdb_scrap_array.length);
    }
    else{
      this.noSearch();
      add_radio?.classList.remove("genre-choose");
      this.tmdb_new_array.splice(0, this.tmdb_new_array.length);
      this.tmdb_movie_array.splice(0, this.tmdb_movie_array.length);
      this.tmdb_tv_array.splice(0, this.tmdb_tv_array.length);
      this.tmdb_scrap_array.splice(0, this.tmdb_scrap_array.length);
    }
  }

  // Loading Animation
  loadAnimation(){
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

  // In case of No Search
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
    for(let p = 0 ; p < this.show_array.length ; p++){
      if(this.show_array[p].id === this.id){
        this.show_array[p].title == undefined ? this.name = this.show_array[p].original_name : this.name = this.show_array[p].title;
        this.show_array[p].release_date == undefined ? this.year = this.show_array[p].first_air_date : this.year = this.show_array[p].release_date;
        this.poster = `https://image.tmdb.org/t/p/w500/${this.show_array[p].poster_path}`;
        this.path = this.show_array[p].poster_path;
        this.overview = this.show_array[p]?.overview;
        this.rate = this.show_array[p].vote_average;
        this.language = this.show_array[p].original_language;
        this.popularity = this.show_array[p].popularity;
        this.type = this.show_array[p].media_type;
      }
    }
  }

  getId(movieId : any){
    this.id = movieId;
    const crew = `https://api.themoviedb.org/3/movie/${this.id}/credits?api_key=1315531f53bb88b9f3c93447893c4b66&language=en-US`;

    axios.get(crew).then(response => {
      this.crew_obj = response;
      console.log(this.crew_obj);
    }).catch(err => {console.log(err)});
  }

  displayPoster(posterpath : any){
      return `https://image.tmdb.org/t/p/w500/${posterpath}`;
  }

  constructor() { 
  }

  ngOnInit(): void {
  }
}
