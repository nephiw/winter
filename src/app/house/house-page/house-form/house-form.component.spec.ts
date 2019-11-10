import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { HouseFormComponent } from './house-form.component';
import { HouseService } from '@app/house/house.service';
import { Router } from '@angular/router';

describe('HouseFormComponent', () => {
  let component: HouseFormComponent;
  let fixture: ComponentFixture<HouseFormComponent>;
  let houseService: jasmine.SpyObj<HouseService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    houseService = jasmine.createSpyObj('HousService', ['createHouse']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HouseFormComponent],
      providers: [
        { provide: HouseService, useValue: houseService },
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
