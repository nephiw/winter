import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsComponent } from './contacts.component';
import { MockComponents } from 'ng-mocks';
import { ContactsTableComponent } from './contacts-table';
import { AdminService } from '@app/admin/admin.service';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;

  let admin: jasmine.SpyObj<AdminService>;

  beforeEach(async(() => {
    admin = jasmine.createSpyObj('AdminService', ['getContacts']);

    TestBed.configureTestingModule({
      declarations: [ ContactsComponent, MockComponents(ContactsTableComponent) ],
      providers: [
        { provide: AdminService, useValue: admin }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('fetches the contacts', () => {
    expect(admin.getContacts).toHaveBeenCalled();
  });
});
