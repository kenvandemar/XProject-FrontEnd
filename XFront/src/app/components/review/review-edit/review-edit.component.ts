import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Review } from '../../../model/review.model';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../review.service';
import { SlugService } from '../../../services/slug.service';
import { Ng2UploaderOptions } from 'ng2-uploader';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NgUploaderOptions } from 'ngx-uploader';
import { UploadService } from './upload.service';

const uploadURL = 'http://api.xtale.net/api/FileUpload';

@Component({
  selector: 'app-review-edit',
  templateUrl: './review-edit.component.html',
  styleUrls: ['./review-edit.component.css'],
})
export class ReviewEditComponent implements OnInit, OnDestroy{
  
  reviewForm: FormGroup;
 images: string[] = [];
 filesToUpload: Array<File>;
 imageName:string;


  private _reviewIndex: number;
  private _review: Review;
  private _subscription: Subscription;
  private _isNew = true;
  private _isDisplay = false;
  private _errorMessage: string
  UserInfo:any = JSON.parse(localStorage.getItem('profile'));
   picName: string;
  constructor(private _route: ActivatedRoute,
              private _reviewService: ReviewService,
              private _formBuilder: FormBuilder,
              private _router:Router,
              private _slug:SlugService,
              private _http: Http,
              private _uploadService:UploadService) { 
              }


  ngOnInit() {
    //remove class in html, body
    //let ck = window['CKEDITOR']['replace']( 'ReviewContent' );
    let html = document.getElementsByTagName("html");
    let body = document.getElementsByTagName("body");
    body[0].removeAttribute("class");
    html[0].removeAttribute("class");

     this._subscription = this._route.params.subscribe(  
      (params: any) =>  {        
        if (params.hasOwnProperty('ReviewId')) {
          this._isNew = false;
          this._reviewIndex = +params['ReviewId'];
          // this._review = this._reviewService.getReview(this._reviewIndex);
        } else {
          this._isNew = true;
          this._review = null;
        }
        this.initForm();
      }
     );     
  }
  onSubmit() {
        const newReview = this.reviewForm.value;  
        if(this._isNew) {
            this._reviewService.addReview(newReview);
        } else {
          this._reviewService.updateReview(this._review);
        }
         
         console.log(newReview);
             
       this._reviewService.navigateBack();
  }

  onCancel() {
      this._reviewService.navigateBack();
  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }

// Handle UploadService
  fileChangeEvent(fileInput: any){

        this.filesToUpload = <Array<File>> fileInput.target.files;
    }
     upload() {    
        this._uploadService.makeFileRequest('http://api.xtale.net/api/FileUpload',[], this.filesToUpload)
                            .then((results) => {
                              console.log(results);
                              this.imageName = "http://api.xtale.net/imageupload/"+results.ImageUrl;
                              console.log(this.imageName);
                            }, (error) => {
                            console.error(error);
                          })                        
        console.log('sent');
        
     }


// Init form
  private initForm() { 
    
      
      let ReviewTitle = '';
      let ReviewContent = ''; 
      let ReviewStatus = 1;
      let CreatedDate =  new Date().toUTCString();
      let LastEditedDate = new Date().toUTCString();
      let UserId = this.UserInfo.user_id;
      let Score = 0;
      let RateCount = 0;   
      let ImageUrl = 'http://www.love-sites.com/wp-content/uploads/2016/04/xem-hinh-girl-xinh9x-11-500x300.jpg'; 
      let Slug = '';

      if(!this._isNew) {
        ReviewTitle = this._review.ReviewTitle;
        ReviewContent = this._review.ReviewContent; 
        ReviewStatus = this._review.ReviewStatus; 
        CreatedDate = this._review.CreatedDate.toUTCString();
        LastEditedDate = this._review.LastEditedDate.toUTCString();
        UserId = this.UserInfo.user_id;
        Score = this._review.Score;
        RateCount = this._review.RateCount;
        ImageUrl = this._review.Image;
        Slug = this._slug.getSlug(ReviewTitle);
      }
  this.reviewForm = this._formBuilder.group({
    ReviewTitle: [ReviewTitle],
    ReviewContent :[ReviewContent],
    ReviewStatus : [ReviewStatus],
    CreatedDate :[CreatedDate],
    LastEditedDate: [LastEditedDate],
    UserId : [UserId],
    Score : [Score],
    RateCount : [RateCount],
    Image: [ImageUrl],
    Slug: [Slug]
  });
  }
}