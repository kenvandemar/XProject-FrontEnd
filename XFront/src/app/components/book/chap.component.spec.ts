/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChapComponent } from './chap.component';

describe('ChapComponent', () => {
  let component: ChapComponent;
  let fixture: ComponentFixture<ChapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
