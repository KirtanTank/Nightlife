import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  search : any = "";
  constructor() { }

  ngOnInit(): void {
  }

  async LoadMovie(searchTerm: any){
    searchTerm = this.search;
    const URL = `http://www.omdbapi.com/?s=${searchTerm}&apikey=266b4fd8`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data);
    if(data.Response == "True") console.log(data);
  }

}
