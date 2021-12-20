import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  public title: string;
  public movies: Array<any>
  constructor() {

    this.title = "movies Component"
    this.movies = [
      {
        title: "Spiderman", image: 'https://es.web.img2.acsta.net/pictures/17/06/19/14/01/130456.jpg'
      },
      {
        title: "Avengers", image: 'https://as01.epimg.net/meristation/imagenes/2020/02/13/cover/892191381581622640.jpg'
      }
    ];

  }

  ngOnInit(): void {
    console.log(this.movies)
  }

}
