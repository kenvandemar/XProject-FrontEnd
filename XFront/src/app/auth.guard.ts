// Written By Khanh Nguyen
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _auth: AuthService, 
                private _router: Router) {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            if(this._auth.authenticated()) {
                console.log('Auth guard passed');
                return true;
            } else {
                console.log('BLOCK BY AUTH GUARD');
                this._router.navigate(['/']);
                return false;
            }
    }
}