/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core'; 

// test component showing different ways to use the directive
// create a host component in test to test various uses of attribute
@Component({
  template: `
    <p highlight="cyan">First</p>
    <p highlight>Second</p>
  `
})
class DirectiveHostComponent { 
}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<DirectiveHostComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectiveHostComponent, HighlightDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectiveHostComponent);
    fixture.detectChanges(); 
  });

  it('should highlight the first element with cyan', () => {
    let de = fixture.debugElement.queryAll(By.css('p'))[0];

    expect(de.nativeElement.style.backgroundColor).toBe('cyan');
  });

  // it('should highlight the second element with yellow', () => {
    it('should highlight the second element with the default color', () => {
    let de = fixture.debugElement.queryAll(By.css('p'))[1];
    // to handle using default instead of hard-coding to 'yellow'
    let directive = de.injector.get(HighlightDirective);

    // this will break if default color is changed in the future
    // expect(de.nativeElement.style.backgroundColor).toBe('yellow');
    // this will not break because testing against defaultColor
    expect(de.nativeElement.style.backgroundColor).toBe(directive.defaultColor);

  });
});
