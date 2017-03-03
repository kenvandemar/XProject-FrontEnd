import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { SlugService } from '../../services/slug.service';
import { Review } from '../../model/review.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReviewService } from './review.service';
import { Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-reviewDetail',
  templateUrl: './reviewDetail.component.html'
})
export class ReviewDetailComponent implements OnInit {
  reviews:Review[] = [];
  slug:string;
  sub: any;

  private _subscription: Subscription;
  private reviewIndex: number;
  selectedReview: any;
  



  constructor(
    private _auth: AuthService,
    private _api: ApiService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _reviewService: ReviewService
  ) { }

  ngOnInit() {
    //remove class in html, body
    let html = document.getElementsByTagName("html");
    let body = document.getElementsByTagName("body");
    body[0].removeAttribute("class");
    html[0].removeAttribute("class");
    //sub params
    this.sub = this._route.params.subscribe(params => {
      this.getStoryList(params['slug']);
      (params: any) => {
        this.reviewIndex = params['id'];
        this.selectedReview = this._reviewService.getReview(this.reviewIndex);
        console.log(this.selectedReview);
      }
    });
  }
  
  getStoryList(slug:string){
      this._api.getApi("http://api.xtale.net/api/Reviews/name/"+slug)
                .subscribe(data => this.reviews = this.reviews.concat(data),
                           error => this.reviews = <any>error);
  }

  //Delete Review
  deleteReview(review: Review) {
      this._reviewService.removeReview(review.ReviewId)
                          .subscribe(data => this.reviews = data);
        this.getStoryList(review.Slug);
       this._reviewService.navigateBack();
  }

  //Edit Review
  editReview() {
     this._router.navigate(['/thao-luan', this.reviewIndex, 'edit']);
  } 
  //check user
  checkUser(){
    if(localStorage.getItem('profile')){
      let user = JSON.parse(localStorage.getItem('profile'));
      if(user.user_id == this.reviews[0].UserId || user.roles[0]== 'mod' || user.roles[0]== 'admin'){
        return true;
      }
      else{
        return false;
      }
    }
    else {
      return false;
    }
  }
}
