import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Chapters } from '../../../model/chapters.model';

@Injectable()
export class ChapService {
  private _chaps: Chapters[] =[];
  private _baseUrl: string = 'http://api.xtale.net/api/chapters';
  private _errorMessage: string;


  constructor(private _http: Http,
              private _router: Router) { }

getChapters(){
  return this._http.get(this._baseUrl)
                     .map((res: Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
}

// getChap(Id: number){
//     const url = `${this._baseUrl}/${Id}`;
//         return this._http.get(url)
//                         .map((res: Response) => res.json())
//                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
// }

 getChapter(id: number) {
    return this._chaps[id];
  }
  
//Create Chap
addChap(chap: Chapters){
  const body = JSON.stringify(chap);
  const headers = new Headers({
    'Content-Type' : 'application/json'
  });
  console.log(body);
  return this._http.post(this._baseUrl, body, {headers: headers})
                    .map((res: Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
                    .subscribe(
                      chap => this._chaps.push(chap),
                      error => this._errorMessage = <any>error
                    )

}
//Update Book
updateChap(body: Object) {
    const bodyString = JSON.stringify(body);
    const headers = new Headers({
      'Content-Type' : 'application/json'
    });
  console.log(body);
   return this._http.put(`${this._baseUrl}/${body['Id']}`, body, headers)
                      .map((res: Response) => res.json())
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error'))                    
}

//Remove Book
removeBook(Id: number): Observable<Chapters[]>{
    return this._http.delete(`${this._baseUrl}/${Id}`)
                    .map((res: Response) => res.json())
                   .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
}

  navigateBack(){
   this._router.navigate(['']);
  }
}


