import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseCompleteComponent } from './house-complete.component';

describe('HouseCompleteComponent', () => {
  let component: HouseCompleteComponent;
  let fixture: ComponentFixture<HouseCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
