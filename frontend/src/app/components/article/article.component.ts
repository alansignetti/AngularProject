import { Global } from 'src/app/services/global';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../models/article';

import swal from 'sweetalert';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {

  public article: Article;
  public url: string;
  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = Global.url;

  }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let id = params['id'];
      this._articleService.getArticle(id).subscribe(
        response => {
          if(response.article){
            this.article = response.article;
          }
          else{
            this._router.navigate(['/home']);
          }
        },
        error =>{
          this._router.navigate(['/home'])
        }
      )

    });
  }

    delete(id:string){

      swal({
        title: "Are you sure?",
        text: "Do you want to delete this article?",
        icon: "warning",
        buttons:['Cancel','Delete'],
        dangerMode: true
      })
      .then(willDelete => {
        if (willDelete) {

          this._articleService.delete(id).subscribe(
            response => {
              if(response){
                swal("Deleted!", "The article has been deleted!", "success");
                this._router.navigate(['/blog']);
              }
            },
            error =>{
              console.log(error);
              this._router.navigate(['/blog']);
            }
          );

        }

      });
    }

    /*


    */

}
