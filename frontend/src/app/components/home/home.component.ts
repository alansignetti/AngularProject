import { Component, OnInit } from '@angular/core';
import { Article } from './../models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService]
})
export class HomeComponent implements OnInit {

  public articles: Article[];
  public title: String;
  constructor(private _articleService: ArticleService) {
    this.title = 'Last Articles'

   }

   ngOnInit(): void {
    this._articleService.getArticles(true).subscribe(
        response =>{
          if(response.articles){
            this.articles = response.articles
            // console.log(this.articles)
          }
        },
        error=>{
          console.log(error);
        }
      );
  }
}
