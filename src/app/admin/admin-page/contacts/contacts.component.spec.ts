import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsComponent } from './contacts.component';
import { MockComponents } from 'ng-mocks';
import { ContactsTableComponent } from './contacts-table';
import { AdminService } from '@app/admin/admin.service';
import { AuthService } from '@app/admin/auth.service';
import { Router } from '@angular/router';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;

  let admin: jasmine.SpyObj<AdminService>;
  let auth: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    admin = jasmine.createSpyObj('AdminService', ['getAllContacts']);
    auth = jasmine.createSpyObj('AuthService', ['logout']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ ContactsComponent, MockComponents(ContactsTableComponent) ],
      providers: [
        { provide: AdminService, useValue: admin },
        { provide: AuthService, useValue: auth },
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
