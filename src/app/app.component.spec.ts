/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; 
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { NavComponent } from './nav/nav.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // RouterTestingModule gives us special testing access to RouterModule
      imports: [ RouterTestingModule.withRoutes([]) ], 
      declarations: [ AppComponent ],
      schemas: [ NO_ERRORS_SCHEMA ] // tells Angular to ignore any elements or attributes it doesn't recognize;
      // alternative is to add NavComponent in declarations (for this test so far)
      // this may be easier if have a component with a lot of child components
      // potential problem: tests will not catch typo issues
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should have a router outlet', () => {
    let de = fixture.debugElement.query(By.directive(RouterOutlet));

    expect(de).not.toBeNull();
  });



});
