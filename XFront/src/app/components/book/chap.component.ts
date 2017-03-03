import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import {Observable} from 'rxjs/Rx';

AuthService

@Component({
  selector: 'app-chap',
  styles: [`
    .results {
      height: 100%;
    }
  `],
  templateUrl: './chap.component.html'
})
export class ChapComponent implements OnInit {
  sub:any;
  slug:string;
  bookInfo:any[];
  chaps:any[]=[];
  chap:number;
  sum = 12;
  start = 1;
  throttle = 300;
  scrollDistance = 1;
  dataStatus = true;
  showComment = false;
  constructor(
    private _auth: AuthService,
    private _api: ApiService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location:Location
   
  ) { }

  ngOnInit() {
      this.sub = this._route.params.subscribe(params => {
        this.slug = params['slug'];
        this.chap = +params['chap'];
        this.getChapContent(this.slug, this.chap);
        this.getBookInfo(this.slug);
        this.setlargeFontUi();
        this.setboldFontUi();
        this.setDarkUi();
        this.setAutoUi();
    });
    Observable.interval(1000 * 30 * 60).subscribe(x => {
      this.setAutoUi();
    });
  }
  
  getChapContent(bookSlug:string, chap:number){
     // Author: Linh Ho
      this._api.getApi("http://api.xtale.net/api/Chapters/"+bookSlug+"/"+chap)
                .subscribe(data =>this.chaps = this.chaps.concat(data),
                           error => this.dataStatus = false);
     //check null chap
     this._api.getApi("http://api.xtale.net/api/Chapters/"+bookSlug+"/"+(chap+1))
                .subscribe(data => {
                    if(data.length<1){
                      this.dataStatus = false;
                    }
                },
                           error => this.dataStatus = false);
    }
  getBookInfo(bookSlug:string){
     // Author: Linh Ho
      this._api.getApi("http://api.xtale.net/api/Stories/name/"+bookSlug)
                .subscribe(data => this.bookInfo = data,
                           error => this.bookInfo = <any>error);
    }

  onScrollDown () {
    if(this.dataStatus == true){
      this.start = this.start + this.sum;
      this.chap = this.chap + 1;
      console.log(this.chap);
      this._router.navigateByUrl("/sach/"+this.slug+"/"+this.chap);
    }
  }
  //set UI lage Font
  setlargeFontUi(){
    let chapContent =document.getElementsByClassName("results");
   
    let tabLarge = document.getElementById("tab-large");
    if(localStorage.getItem("largeFont") == "true"){
      chapContent[0].style.font = " 2rem Roboto Slab,serif";
      tabLarge.className = "selectUi";
    }
    else {
      chapContent[0].style.font = " 1.2rem Roboto Slab,serif";
      tabLarge.removeAttribute("class");
    }
  }
  //set UI bold Font
   setboldFontUi(){
    let chapContent = document.getElementsByClassName("results");
    let tabBold = document.getElementById("tab-bold");
    if(localStorage.getItem("boldFont") == "true"){
      chapContent[0].className += " boldFont";
      tabBold.className = "selectUi";
    }
    else {
      chapContent[0].className = " results";
      tabBold.removeAttribute("class");
    }
  }
  //set dark UI 
   setDarkUi(){
    let html = document.getElementsByTagName("html");
    let body = document.getElementsByTagName("body");
    let tabdarkUi = document.getElementById("tab-darkUi");
    let tabautoUi = document.getElementById("tab-autoUi");
    if(localStorage.getItem("darkUi") == "true"){
      localStorage.setItem("autoUi","false");
      tabautoUi.removeAttribute("class");
      html[0].className = "setDarkUi";
      body[0].className = "setDarkUi";
      tabdarkUi.className = "selectUi";
    }
    else {
      body[0].removeAttribute("class");
      html[0].removeAttribute("class");
      tabdarkUi.removeAttribute("class");
    }
  }
  //set auto Ui
  setAutoUi(){
    let html = document.getElementsByTagName("html");
    let body = document.getElementsByTagName("body");
    let tabautoUi = document.getElementById("tab-autoUi");
    let tabdarkUi = document.getElementById("tab-darkUi");
    if(localStorage.getItem("autoUi") == "true"){
      localStorage.setItem("darkUi","false");
      tabdarkUi.removeAttribute("class");
        var d = new Date();
        var h = d.getHours();
        if(h>=2&&h<6){
          html[0].className = "setAutoUi2";
          body[0].className = "setAutoUi2";
        }
        if(h>=6&&h<16){
          html[0].className = "setAutoUi3";
          body[0].className = "setAutoUi3";
        }
        if(h>=16&&h<20){
          html[0].className = "setAutoUi2";
          body[0].className = "setAutoUi2";
        }
        if(h>=20&&h<24||h>=0&&h<2){
          html[0].className = "setAutoUi1";
          body[0].className = "setAutoUi1";
        }
        tabautoUi.className = "selectUi";
    }
    else {
      tabautoUi.removeAttribute("class");
      if(localStorage.getItem("darkUi")=="false" || !localStorage.getItem("darkUi")){
        body[0].removeAttribute("class");
        html[0].removeAttribute("class");
      }
      else{
        html[0].className = "setDarkUi";
        body[0].className = "setDarkUi";
      }
    }
  }
  //click large Font
  largeFont(){
    if(localStorage.getItem("largeFont") == "false" || !localStorage.getItem("largeFont")){
      localStorage.setItem("largeFont","true");
      this.setlargeFontUi();
    }
    else {
      localStorage.setItem("largeFont","false");
      this.setlargeFontUi();
    }
  }
  //click bold Font
  boldFont(){
    if(localStorage.getItem("boldFont") == "false" || !localStorage.getItem("boldFont")){
      localStorage.setItem("boldFont","true");
      this.setboldFontUi();
    }
    else {
      localStorage.setItem("boldFont","false");
      this.setboldFontUi();
    }
  }
  //click dark Ui
  darkUi(){
    if(localStorage.getItem("darkUi") == "false" || !localStorage.getItem("darkUi")){
      localStorage.setItem("darkUi","true");
      this.setDarkUi();
    }
    else {
      localStorage.setItem("darkUi","false");
      this.setDarkUi();
    }
  }
  //click auto Ui
  autoUi(){
    if(localStorage.getItem("autoUi") == "false" || !localStorage.getItem("autoUi")){
      localStorage.setItem("autoUi","true");
      this.setAutoUi();
    }
    else {
      localStorage.setItem("autoUi","false");
      this.setAutoUi();
    }
  }
  //show comment
  showFcomment(){
    this.showComment = !this.showComment;
    if(this.showComment) {
        document.getElementById("Fcomment").style.width = "550px";
        document.getElementById("FbgClose").style.height = "100vh";
      }
      else {
        document.getElementById("Fcomment").style.width = "0px";
        document.getElementById("FbgClose").style.height = "0px";
      }
  }

}
