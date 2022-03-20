
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute,Params} from '@angular/router';

import { Article } from './../models/article';
import { ArticleService } from 'src/app/services/article.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ArticleService]
})
export class SearchComponent implements OnInit {


  public articles: Article[];
  public search: string;
  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService

  ) { }

  ngOnInit(): void {


    this._route.params.subscribe(params =>{

      var search = params['search'];
      this.search = search;

      this._articleService.search(search).subscribe(
        res => {
          if(res.articles){
            this.articles = res.articles;
          }else{
            this.articles = [];
          }
        },
        err =>{
          // si no hay articulos lo seteo en vacio para que no se quede cargando
          this.articles = [];

        }
      )

    })
  }

}
