import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { SlugService } from '../../services/slug.service';
import { Story } from '../../model/story.model';
import { ActivatedRoute, Router } from '@angular/router';
AuthService

@Component({
  selector: 'app-home',
  styles: [`
    .results {
      height: 100%;
      overflow: scroll;
    }
  `],
  templateUrl: './genre.component.html'
})
export class GenreComponent implements OnInit {
  stories:Story[] = [];
  genreName:string;
  sum = 12;
  start = 1;
  throttle = 300;
  scrollDistance = 1;
  sub:any;
  param:string;
  dataStatus:boolean = true;
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
      this.getGenre(params['slug']);
      this.param = params['slug'];
    });
  }
  
  getGenre(slug:string){
    this._api.getApi("http://api.xtale.net/api/Genres/name/"+slug)
                .subscribe(data => this.genreName = data[0].GenreName);
  }

  getStoryList(start:number, param:string){
     // Author: Linh Ho
     let end = start + this.sum - 1;
      this._api.getApi("http://api.xtale.net/api/Stories/genre/"+param+"/"+start+"/"+end)
                .subscribe(data => this.stories = this.stories.concat(data),
                           error => this.dataStatus == false);
      this._api.getApi("http://api.xtale.net/api/Stories/genre/"+param+"/"+start+this.sum+"/"+end+this.sum)
                .subscribe(data =>{
                    if(data.length<1){
                      this.dataStatus = false;
                    }
                },
                           error => this.dataStatus == false);
  }
  
  onScrollDown () {
    if(this.dataStatus == true){
      this.start = this.start + this.sum;
      this.getStoryList(this.start, this.param);
    }
  }

}
