import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Review } from '../../model/review.model';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Injectable()
export class ReviewService {
  reviewChanged = new EventEmitter<Review[]>();

  private _reviews: Review[] = [];
  private _errorMessage: string;
  private _baseUrl: string = 'http://api.xtale.net/api/reviews';
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  constructor(private _http: Http,
             private _router:Router) { }

  getReviews(){
   return this._http.get(this._baseUrl)
                     .map((res: Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  getReview(Id: number) {
        const url = `${this._baseUrl}/${Id}`;
        return this._http.get(url)
                        .map((res: Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
                          
  }
  
  deleteReview(review: Review) {
    this._reviews.splice(this._reviews.indexOf(review), 1);
  }
  
  // Create Review
  addReview(review: Review) {
    const body = JSON.stringify(review);
    const headers = new Headers({
      'Content-Type' : 'application/json'
    });
   console.log(body);
    return this._http.post(this._baseUrl, body, {headers:headers})
                     .map((res: Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
                     .subscribe(
                       review => this._reviews.push(review),
                        error =>  this._errorMessage = <any>error
                     );
  }

  //Edit Review
  updateReview(body: Object) {
    const bodyString = JSON.stringify(body);
    const headers = new Headers({
      'Content-Type' : 'application/json'
    });
    console.log(body);
    return this._http.put(`${this._baseUrl}/${body['Id']}`, body, headers)
                      .map((res: Response) => res.json())
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error'))                    
  }
  
  // Delete Review
  removeReview(Id: number): Observable<Review[]>{
          return this._http.delete(`${this._baseUrl}/${Id}`)
                          .map((res: Response) => res.json())
                          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  navigateBack() {
      this._router.navigate(['thao-luan']);
  }

  editReview(oldReview: Review, newReview: Review) {
    this._reviews[this._reviews.indexOf(oldReview)] = newReview;
  }

  // storeData(review: Review) {
  //   const body= JSON.stringify(this._reviews);
  //   const headers = new Headers({
  //       'Content-Type': 'application/json'
  //   });
  //   return this._http.put(`${this._baseUrl}/reviews/${review.ReviewId}`, body, {headers: headers});
  // }

  // onStore(){
  //   this.storeData(review: Review).subscribe(
  //     data => console.log(data),
  //     error => console.log(error)
  //   );
  // }

  fetchData(){
    return this._http.get(`${this._baseUrl}/reviews`)
           .map((response: Response) => response.json())
           .subscribe(
             (data: Review[]) => {
               this._reviews = data;
               this.reviewChanged.emit(this._reviews);
             }
           );
  }  
}
