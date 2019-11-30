import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousePageComponent } from './house-page.component';
import { AdminService } from '@app/admin/admin.service';
import { Subject } from 'rxjs';
import { MockComponents } from 'ng-mocks';
import { HouseTableComponent } from './house-table';

describe('HousePageComponent', () => {
  let component: HousePageComponent;
  let fixture: ComponentFixture<HousePageComponent>;
  let adminService: jasmine.SpyObj<AdminService>;
  let houseSubject: Subject<any>;

  beforeEach(async(() => {
    houseSubject = new Subject();
    adminService = jasmine.createSpyObj('AdminService', ['getHouseContacts']);
    adminService.getHouseContacts.and.returnValue(houseSubject.asObservable());

    TestBed.configureTestingModule({
      declarations: [ HousePageComponent, MockComponents( HouseTableComponent ) ],
      providers: [{ provide: AdminService, useValue: adminService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
