import { Component, OnInit } from '@angular/core';
import { Film } from '../models/film';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  public title: string;
  public movies: Film[];
  public favorite: Film;
  constructor() {

    this.title = "movies Component"
    this.movies = [
      new Film("Spiderman", 'https://es.web.img2.acsta.net/pictures/17/06/19/14/01/130456.jpg')
      , new Film("Avengers", 'https://as01.epimg.net/meristation/imagenes/2020/02/13/cover/892191381581622640.jpg')

    ];

  }

  ngOnInit(): void {
    // console.log(this.movies)
  }
  showFavorite(event:any){
    this.favorite = event.movie;
  }
}
