import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Story } from '../../model/story.model';
import { Review } from '../../model/review.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any;
  stories:Story[];
  reviews:Review[];
  constructor(
    private _auth: AuthService,
    private _api: ApiService) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    console.log(this.profile);
   }

  ngOnInit() {
    //remove class in html, body
    let html = document.getElementsByTagName("html");
    let body = document.getElementsByTagName("body");
    body[0].removeAttribute("class");
    html[0].removeAttribute("class");
    //get books
    this.getBookUser();
    //get reviews
    this.getReviewUser();
  }
  
  checkRoles():boolean{
    if(this.profile.roles[0] == 'admin' ||this.profile.roles[0] == 'mod'){
      return true;
    }
    else {
      return false;
    }
  }

  getBookUser(){
    // Author: Linh Ho
      this._api.getApi("http://api.xtale.net/api/Stories/user/"+this.profile.user_id+"/1/10")
                .subscribe(data => this.stories = data,
                           error => this.stories = <any>error);
  }
  getReviewUser(){
    // Author: Linh Ho
      this._api.getApi("http://api.xtale.net/api/Reviews/user/"+this.profile.user_id+"/1/10")
                .subscribe(data => this.reviews = data,
                           error => this.reviews = <any>error);
  }
}
