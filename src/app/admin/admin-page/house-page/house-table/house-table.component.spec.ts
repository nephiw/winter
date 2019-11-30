import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseTableComponent } from './house-table.component';
import { AdminService } from '@app/admin/admin.service';
import { MockComponents, MockPipe } from 'ng-mocks';
import { NumberInputComponent } from './number-input';

describe('HouseTableComponent', () => {
  let component: HouseTableComponent;
  let fixture: ComponentFixture<HouseTableComponent>;
  let adminService: jasmine.SpyObj<AdminService>;

  beforeEach(async(() => {
    adminService = jasmine.createSpyObj('AdminService', [
      'changeSigned',
      'changeEmail',
      'setNumber'
    ]);

    TestBed.configureTestingModule({
      imports: [RouterModule, FormsModule],
      declarations: [ HouseTableComponent, MockPipe(DatePipe), MockComponents(NumberInputComponent) ],
      providers: [{ provide: AdminService, useValue: adminService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
