import { Component, OnInit } from '@angular/core';
import { Global } from './../../services/global';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from './../models/article';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../created-article/created-article.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService],
})
export class ArticleEditComponent implements OnInit {
  public article: Article;
  public status: string;
  public is_edit: boolean;
  public page_title: string;
  public url: string;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.article = new Article('', '', '', '', null);
    this.is_edit = true;
    this.page_title = 'Edit Article';
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getArticle();
  }

  onSubmit() {
    this._articleService.update(this.article._id, this.article).subscribe(
      (res) => {
        if (res.status == 'success') {
          this.status = 'success';
          this.article = res.article;
          //sweetalert
          swal('Edited!', 'Article Edited Succesfully', 'success');

          this._router.navigate(['/blog/article', this.article._id]);
        } else {
          this.status = 'error';
          swal('Oops!', 'Something went wrong!', 'error');
        }
      },
      (err) => {
        this.status = 'error';
        swal('Oops!', 'Something went wrong!', 'error');
      }
    );
  }

  imageUpload(data: any) {
    let image_data = data.body.image;
    this.article.image = image_data;
    console.log(this.article);
  }

  getArticle() {
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this._articleService.getArticle(id).subscribe(
        (response) => {
          if (response.article) {
            this.article = response.article;
          } else {
            this._router.navigate(['/home']);
          }
        },
        (error) => {
          this._router.navigate(['/home']);
        }
      );
    });
  }
}
