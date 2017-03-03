import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class AuthenticationCallbackActivateGuard implements CanActivate {

  constructor(private location: Location) { }

  canActivate() {
    // You may want to make a more robust check here
    return this.location.path(true).indexOf("access_token") === -1;
  }
}