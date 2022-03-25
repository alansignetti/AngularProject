import { Global } from './../../services/global';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from './../models/article';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-created-article',
  templateUrl: './created-article.component.html',
  styleUrls: ['./created-article.component.css'],
  providers: [ArticleService]
})
export class CreatedArticleComponent implements OnInit {

  public article: Article;
  public status: string;
  public page_title: string;
  public is_edit:boolean;
  public url: string;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: 50,
    uploadAPI: {
      url: Global.url+'/upload-image'
      },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    autoUpload: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach File...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

    this.article = new Article('', '', '', '', null),
    this.page_title = 'Create a New Article!',
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

  onSubmit() {

    this._articleService.create(this.article).subscribe(
      res => {
        if (res.status == 'success') {
          this.status = 'success';
          this.article = res.article;
          this._router.navigate(['/home']);

        } else {
          this.status = 'error';
          // this._router.navigate(['/blog']);
        }


      },
      err => {
        this.status = 'error';
        // this._router.navigate(['/blog']);
      }
    )
  }

  imageUpload(data:any){
    let image_data = data.body.image;
    this.article.image = image_data;
    console.log(this.article);
  }


}
