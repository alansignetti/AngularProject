import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../components/models/article';
import { Global } from './global';

@Injectable()
export class ArticleService{

  public url: string;

  constructor(
    private _http: HttpClient

  ){
    this.url = Global.url;
  }


    prueba(){
      return console.log("Article Service http")
    }

    getArticles():Observable<any>{
      return this._http.get(this.url+'articles')
  }


}


