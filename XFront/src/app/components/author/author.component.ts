import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { SlugService } from '../../services/slug.service';
import { Story } from '../../model/story.model';
import { ActivatedRoute, Router } from '@angular/router';
AuthService

@Component({
  selector: 'app-author',
  styles: [`
    .results {
      height: 100%;
      overflow: scroll;
    }
  `],
  templateUrl: './author.component.html'
})
export class AuthorComponent implements OnInit {
  stories:Story[] = [];
  sum:number = 10;
  start:number = 1;
  throttle:number = 300;
  scrollDistance:number = 1;
  dataStatus:boolean = true;
  slug:string;
  sub:any;
  authorName:string;
  constructor(
    private _auth: AuthService,
    private _api: ApiService,
    private _route: ActivatedRoute,
    private _router: Router 
  ) { }

  ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
      this.stories = [];
      this.getStoryList(this.start, params['slug']);
      this.getAuthor(params['slug']);
      this.slug = params['slug'];
    });
  }

   getAuthor(slug:string){
    this._api.getApi("http://api.xtale.net/api/Authors/name/"+slug)
                .subscribe(data => this.authorName = data[0].AuthorName);
  }
  
  getStoryList(start:number, params:string){
     // Author: Linh Ho
     let end:number = start + this.sum - 1;
      this._api.getApi("http://api.xtale.net/api/Stories/author/"+params+"/"+start+"/"+end)
                .subscribe(data => this.stories = this.stories.concat(data),
                           error => this.dataStatus = false);
      //check data null
     this._api.getApi("http://api.xtale.net/api/Stories/author/"+params+"/"+(start+this.sum)+"/"+(end+this.sum))
                .subscribe(data => {
                    if(data.length<1){
                      this.dataStatus = false;
                    }
                },error => this.dataStatus = false);
  }
  
  onScrollDown () {
    if(this.dataStatus == true){
      console.log(this.start);
      this.start = this.start + this.sum;
      this.getStoryList(this.start,this.slug);
    }
  }
}
