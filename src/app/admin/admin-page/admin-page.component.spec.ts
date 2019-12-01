import { async, ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { MockComponents } from 'ng-mocks';

import { AdminPageComponent } from './admin-page.component';
import { AuthService } from '../auth.service';
import {
  RouterLink,
  RouterOutlet,
  RouterLinkActive,
  Router
} from '@angular/router';
import { NativeDeferred, createNativeDeferred } from '@test/utils';
import { By } from '@angular/platform-browser';

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;
  let auth: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let logoutDeferred: NativeDeferred<void>;

  beforeEach(async(() => {
    logoutDeferred = createNativeDeferred();
    auth = jasmine.createSpyObj('AuthService', ['logout']);
    auth.logout.and.returnValue(logoutDeferred.promise);

    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [
        AdminPageComponent,
        MockComponents(RouterLink, RouterOutlet, RouterLinkActive)
      ],
      providers: [
        { provide: AuthService, useValue: auth },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('logout button', () => {
    it('calls logout when clicked', () => {
      fixture.debugElement
        .query(By.css('.logout'))
        .triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(auth.logout).toHaveBeenCalled();
    });

    it('navigates to login page', fakeAsync(() => {
      fixture.debugElement
        .query(By.css('.logout'))
        .triggerEventHandler('click', null);
      fixture.detectChanges();

      logoutDeferred.resolve();
      flushMicrotasks();

      expect(router.navigate).toHaveBeenCalledWith(['admin', 'login']);
    }));
  });
});
