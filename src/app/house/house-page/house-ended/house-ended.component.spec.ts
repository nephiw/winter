import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseEndedComponent } from './house-ended.component';

describe('HouseEndedComponent', () => {
  let component: HouseEndedComponent;
  let fixture: ComponentFixture<HouseEndedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseEndedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseEndedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
