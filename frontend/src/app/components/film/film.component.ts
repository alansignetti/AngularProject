import { Film } from './../models/film';
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  @Input() movie: Film;
  @Output() selectAsFavorite = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  favorite(event:any, movie:Film){
    this.selectAsFavorite.emit({
      movie:movie
    });
  }




}
