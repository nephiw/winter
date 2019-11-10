import { Router, NavigationEnd } from '@angular/router';
import {
  TestBed,
  async,
  ComponentFixture,
  fakeAsync,
  flushMicrotasks
} from '@angular/core/testing';
import { Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let element: HTMLElement;

  let navigationSubject: Subject<any>;
  let mockWindow: jasmine.SpyObj<Window>;

  beforeEach(async(() => {
    navigationSubject = new Subject();

    const mockRouter = { events: navigationSubject.asObservable() };
    mockWindow = jasmine.createSpyObj('Window', ['scrollTo']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: 'Window', useValue: mockWindow }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('scrolls to the top on after the page changes', fakeAsync(() => {
    fixture.detectChanges();
    expect(mockWindow.scrollTo).not.toHaveBeenCalled();

    navigationSubject.next(new NavigationEnd(0, 'url', 'urlAfterRedirect'));
    flushMicrotasks();
    expect(mockWindow.scrollTo).toHaveBeenCalledWith(0, 0);
  }));
});
