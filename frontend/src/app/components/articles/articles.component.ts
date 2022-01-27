

import { Article } from './../models/article';
import { Component, Input, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  public url: string
  @Input() articles: Article[];
  constructor(

  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

}
