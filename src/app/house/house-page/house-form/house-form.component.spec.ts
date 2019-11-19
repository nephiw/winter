import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MockPipe } from 'ng-mocks';

import { HouseFormComponent } from './house-form.component';
import { HouseService } from '@app/house/house.service';
import { OrdinalDatePipe, DateService } from '@app/common/date';

describe('HouseFormComponent', () => {
  let component: HouseFormComponent;
  let fixture: ComponentFixture<HouseFormComponent>;
  let houseService: jasmine.SpyObj<HouseService>;
  let router: jasmine.SpyObj<Router>;
  let dateService: Partial<DateService>;

  beforeEach(async(() => {
    houseService = jasmine.createSpyObj('HousService', ['createHouse']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    dateService = { houseCutoff: new Date(), voteCutoff: new Date() };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HouseFormComponent, MockPipe(OrdinalDatePipe)],
      providers: [
        { provide: HouseService, useValue: houseService },
        { provide: DateService, useValue: dateService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
