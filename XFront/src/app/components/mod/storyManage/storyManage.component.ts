import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { SlugService } from '../../../services/slug.service';
import { Story } from '../../../model/story.model';
import { Router } from '@angular/router';
AuthService

@Component({
  selector: 'app-storyManage',
  styles: [`
    .results {
      height: 100%;
    }
  `],
  templateUrl: './storyManage.component.html'
})
export class StoryManageComponent implements OnInit {
  stories:Story[] = [];
  sum:number = 50;
  start:number = 1;
  throttle:number = 300;
  scrollDistance:number = 1;
  dataStatus:boolean = true;
  bookSearch:string;
  searchNull:boolean = false;
  searchStatus:boolean = false;
  profile:any;
  constructor(
    private _auth: AuthService,
    private _api: ApiService,
    private _router: Router
  ) { 
    this.profile = JSON.parse(localStorage.getItem('profile'));
    if(this.profile.roles[0] != 'admin' && this.profile.roles[0] != 'mod'){
      this._router.navigateByUrl("/profile");
    }
  }

  ngOnInit() {
    //remove class in html, body
    let html = document.getElementsByTagName("html");
    let body = document.getElementsByTagName("body");
    body[0].removeAttribute("class");
    html[0].removeAttribute("class");

    this.getStoryList(this.start);
  }

  getStoryList(start:number){
     // Author: Linh Ho
     let end:number = start + this.sum - 1;
      this._api.getApi("http://api.xtale.net/api/Stories/range/"+start+"/"+end)
                .subscribe(data => this.stories = this.stories.concat(data),
                           error => this.dataStatus = false);
      //check data null
     this._api.getApi("http://api.xtale.net/api/Stories/range/"+(start+this.sum)+"/"+(end+this.sum))
                .subscribe(data => {
                    if(data.length<1){
                      this.dataStatus = false;
                    }
                },error => this.dataStatus = false);
  }
  
  onScrollDown () {
    if(this.dataStatus == true){
      this.start = this.start + this.sum;
      this.getStoryList(this.start);
    }
  }
  search(){
    if(this.bookSearch !=""){
      this.searchStatus = true;
      this._api.getApi("http://api.xtale.net/api/Stories/search/"+this.bookSearch+"/1/100")
                .subscribe(data =>{
                  this.stories = data;
                  if(data.length<1){
                    this.searchNull = true;
                  }
                },
                           error => this.searchNull = true);
    }
  }
  checkClearSearch(){
    if(this.bookSearch ==""){
      this.clearSearch();
    }
  }
  clearSearch(){
    this.searchNull = false;
    this.bookSearch = "";
    this.stories = [];
    this.start = 1;
    this.searchStatus = false;
    this.getStoryList(this.start);
  }
}
