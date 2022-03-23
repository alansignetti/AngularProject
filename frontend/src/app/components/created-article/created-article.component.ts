import { ArticleService } from 'src/app/services/article.service';
import { Article } from './../models/article';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-created-article',
  templateUrl: './created-article.component.html',
  styleUrls: ['./created-article.component.css'],
  providers: [ArticleService]
})
export class CreatedArticleComponent implements OnInit {

  public article: Article;
  public status: string;

  constructor(
    private _articleService : ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

    this.article = new Article('','','','',null);
   }

  ngOnInit(): void {
  }

  onSubmit(){

    this._articleService.create( this.article).subscribe(
      res=>{
        if(res.status == 'success'){
          this.status = 'success';
          this.article = res.article;
          this._router.navigate(['/blog']);

        }else{
          this.status = 'error';
          // this._router.navigate(['/blog']);
        }


      },
      err=>{
        this.status = 'error';
        // this._router.navigate(['/blog']);
      }
    )
  }


}
