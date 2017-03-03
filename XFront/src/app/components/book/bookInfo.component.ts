import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Story } from '../../model/story.model';
import { BookService } from './book.service';

@Component({
  selector: 'app-bookInfo',
  styles: [`
    .results {
      height: 100%;
    }
  `],
  templateUrl: './bookInfo.component.html'
})
export class BookInfoComponent implements OnInit {
  bookInfo:any[];
  listChap:any[] = [];
  slug:string;
  sub: any;


  books: Story[] = [];
  sum:number = 20;
  start:number = 1;
  throttle:number = 300;
  scrollDistance:number = 1;
  dataStatus:boolean = true;

  chapSearch:string;
  searchNull:boolean = false;
  searchStatus:boolean = false;
  constructor(
    private _auth: AuthService,
    private _api: ApiService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _bookService: BookService
  ) { }

  ngOnInit() {
    //remove class in html, body
    let html = document.getElementsByTagName("html");
    let body = document.getElementsByTagName("body");
    body[0].removeAttribute("class");
    html[0].removeAttribute("class");
    //sub params
    this.sub = this._route.params.subscribe(params => {
      this.slug = params['slug'];
      this.getBookInfo(this.slug);
      this.getListChap(this.start, this.slug);
    });
  }
  
  getBookInfo(bookSlug:string){
    // Author: Linh Ho
    this._api.getApi("http://api.xtale.net/api/Stories/name/"+bookSlug)
              .subscribe(data => this.bookInfo = data,
                          error => this.bookInfo = <any>error);
  }

  getListChap(start:number,bookSlug:string){
    // Author: Linh Ho
    let end:number = start + this.sum - 1;
    this._api.getApi("http://api.xtale.net/api/Chapters/range/"+bookSlug+"/"+start+"/"+end)
              .subscribe(data => this.listChap = this.listChap.concat(data),
                          error => this.listChap = <any>error);
      // check Chapters
      this._api.getApi("http://api.xtale.net/api/Chapters/range/"+bookSlug+"/"+(start+this.sum)+"/"+(end+this.sum))
              .subscribe(data => {
                if(data.length<1){
                    this.dataStatus = false;
                }
              },
                          error => this.listChap = <any>error);
  }

//scroll
  onScrollDown () {
    if(this.dataStatus == true){
      this.start = this.start + this.sum;
      this.getListChap(this.start,this.slug);
    }
  }

    //search chap
  search(){
    if(this.chapSearch !=""){
      this.searchStatus = true;
      this._api.getApi("http://api.xtale.net/api/Chapters/search/"+this.slug+"/"+this.chapSearch)
                .subscribe(data =>{
                  this.listChap = data;
                  if(data.length<1){
                    this.searchNull = true;
                  }
                },
                           error => this.searchNull = true);
    }
  }

  checkClearSearch(){
    if(this.chapSearch ==""){
      this.clearSearch();
    }
  }

  clearSearch(){
    this.searchNull = false;
    this.chapSearch = "";
    this.listChap = [];
    this.start = 1;
    this.searchStatus = false;
    this.getListChap(this.start,this.slug);
  }

   //Delete Book
 deleteBook(book: Story) {
     this._bookService.removeBook(book.StoryId)
                       .subscribe(data => this.books = data);
                       this._bookService.navigateBack();
    }

  //check user
  checkUser(){
    if(localStorage.getItem('profile')){
      let user = JSON.parse(localStorage.getItem('profile'));
      if(user.user_id == this.bookInfo[0].UserId || user.roles[0] == 'mod' || user.roles[0] == 'admin'){
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
