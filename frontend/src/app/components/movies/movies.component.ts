import { Component, OnInit } from '@angular/core';
import { Film } from '../models/film';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [FilmService]
})
export class MoviesComponent implements OnInit {

  public title: string;
  public movies: Film[];
  public favorite: Film;

  constructor( private _filmService: FilmService) {

    this.title = "movies Component"
    this.movies =  this._filmService.getMovies();

  }

  ngOnInit(): void {


  }
  showFavorite(event:any){
    this.favorite = event.movie;
  }
}
