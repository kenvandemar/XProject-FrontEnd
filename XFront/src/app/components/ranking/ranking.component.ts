import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
AuthService

@Component({
  selector: 'app-home',
  templateUrl: './ranking.component.html'
})
export class RankingComponent implements OnInit {
  storiesRank = [];
  reviewsRank = [];
  userRank = [];
  constructor(
    private _auth: AuthService,
    private _api: ApiService
  ) { }

  ngOnInit() {
    //remove class in html, body
    let html = document.getElementsByTagName("html");
    let body = document.getElementsByTagName("body");
    body[0].removeAttribute("class");
    html[0].removeAttribute("class");

    this.getStoryRank();
    this.getReviewRank();
  }
  getStoryRank(){
     // Author: Linh Ho
      this._api.getApi("http://api.xtale.net/api/Stories/rank/10")
                .subscribe(data => this.storiesRank = data,
                           error => this.storiesRank = <any>error);
  }
  getReviewRank(){
     // Author: Linh Ho
      this._api.getApi("http://api.xtale.net/api/Reviews/rank/10")
                .subscribe(data => this.reviewsRank = data,
                           error => this.reviewsRank = <any>error);
  }
}
