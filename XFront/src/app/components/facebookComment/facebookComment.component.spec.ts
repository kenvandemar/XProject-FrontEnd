/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FacebookComment } from './facebookComment.component';

describe('StarComponent', () => {
  let component: FacebookComment;
  let fixture: ComponentFixture<FacebookComment>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookComment ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookComment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
