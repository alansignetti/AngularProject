import { Injectable } from "@angular/core";
import { Film } from "../components/models/film";


@Injectable()
export class FilmService{


  public movies: Film[];

  constructor(){
    this.movies = [
       new Film("Spiderman", 'https://es.web.img2.acsta.net/pictures/17/06/19/14/01/130456.jpg')
      ,new Film("Avengers", 'https://as01.epimg.net/meristation/imagenes/2020/02/13/cover/892191381581622640.jpg')

    ];
  }


  getMovies(){
    return this.movies;
  }


}
