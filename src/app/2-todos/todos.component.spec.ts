/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { of } from 'rxjs';

//NOTE: I've deliberately excluded this suite from running
// because the test will fail. This is because we have not 
// provided the TodoService as a dependency to TodosComponent. 
// 
// When you get to Lecture 6 (Providing Dependencies), be sure
// to remove "x" from "xdescribe" below.

// Not enough to provide just TodoServie in configureTestingModule, as it
// depends on HttpClient, and will get this error:
//     NullInjectorError: No provider for HttpClient!
// So need to import HttpClient as well

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ TodosComponent ],
      providers: [ TodoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // in unit tests do it this way:
    // new TodosComponent(new TodoService()); // and use a spyOn for the service;
    // this doesn't work for integration; instead register as provider in testingModule
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should load todos from the server', () => {
  //   let service = TestBed.get(TodoService); // works if have provided dependency at module level
  //   // if have providers[] for a COMPONENT, have to do it this way
  //   // fixture.debugElement.injector.get(TodoService);

  //   // use of detectChanges in beforeEach will make it impossible to change
  //   // behavior of service as it will already have forced call of ngOnInit
  //   spyOn(service, 'getTodos').and.returnValue(of([1,2,3]));
    
  //   fixture.detectChanges(); // call here instead

  //   expect(component.todos.length).toBe(3);
  // });


  // changed code to use getTodosPromise; here is modified test
  // use async or fakeAsync
  it('should load todos from the server', fakeAsync(() => {
    let service = TestBed.get(TodoService); 

    spyOn(service, 'getTodosPromise').and.returnValue(Promise.resolve([1,2,3]));
    
    fixture.detectChanges(); // call here instead

    tick(); // simulate passage of time with fakeAsync
    expect(component.todos.length).toBe(3);

    // whenStable will be called when all async are done
    // use with async
    // fixture.whenStable().then(() => {
    //   expect(component.todos.length).toBe(3);
    //   console.log('EXPECT WAS CALLED');
    // });
  }));
});
