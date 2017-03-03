import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

 // Author: Linh Ho
 
@Injectable()
export class ApiService {
    constructor(private _http: Http) {}

    getApi(_url:string) {
        return this._http.get(_url)
            .map((response: Response) => <any> response.json())
            // .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}