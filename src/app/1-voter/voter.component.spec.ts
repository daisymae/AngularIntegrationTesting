import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {
  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>;

  beforeEach(() => {
    // in integration tests, do not 'new' a component, instead as Angular to create for you
    // testingModule set up like NgModule
    TestBed.configureTestingModule({
      declarations: [VoterComponent]
    });

    // returns ComponentFixture<T>
    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;
    // fixture.nativeElement // returns DOM element
    // fixture.debugElement // wrapper around nativeELement -- useful for querying the DOM (will return the root)
    // using ng generate to create component will auto-generate test files with a bunch of this boiler plate for integration testing
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // want to test anywhere have bindings in the template:
  // property bindings, class bindings, style bindings, or inline binding
  // from the html: {{ totalVotes }}; highlighted class, and the click for upVote()
  it('should render total votes', () => {
    component.othersVote = 20;
    component.myVote = 1;
    fixture.detectChanges(); // tell Angular to detect the changes

    // totalVotes rendered in span with class vote-count
    let de = fixture.debugElement.query(By.css('.vote-count')); // returns first element matching the predicate
    // could also use queryAll to get ALL the elements that match
    // could also use directive:
    // fixture.debugElement.query(By.directive(VoterComponent)); // example. our component isn't a directive

    // set a local variable of type HTMLElement to get assist, otherwise, nativeElement is of type any
    let el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain('21'); // this fails because we set the properties, but the DOM is not updated, because Angular is not running changeDetection
    // this is fixed with the addition of the call to detectChanges()
  })

  it('should hightlight the upvote button if I have upvoted', () => {
    component.myVote = 1;
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));

    expect(de.classes['highlighted']).toBeTruthy();
  })

  it('should increase total votes when I click the upvote button', () => {
    let button = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
    button.triggerEventHandler('click', null);

    expect(component.totalVotes).toBe(1);
  })

});
