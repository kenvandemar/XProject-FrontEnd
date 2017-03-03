import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { Genre } from './model/genre.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  categoryShow:boolean = false;
  categoryList:Genre[];
  errorMessage:string; 
  constructor(
    private _auth: AuthService,
    private _api: ApiService
  ) {
  }

  ngOnInit() {
    this.getCategoryList()
  }
  getCategoryList(){
     // Author: Linh Ho
      this._api.getApi("http://api.xtale.net/api/Genres")
                .subscribe(data => this.categoryList = data,
                           error => this.errorMessage = <any>error);
    }
    
  openMenu() {
      // Author: Linh Ho
      this.categoryShow = !this.categoryShow;
      if(this.categoryShow) {
        document.getElementById("category-form").style.height = "40vh";
        document.getElementById("web-content").style.marginTop = "40vh";
      }
      else {
        document.getElementById("category-form").style.height = "0%";
        document.getElementById("web-content").style.marginTop = "90px";
      }
  }
}
