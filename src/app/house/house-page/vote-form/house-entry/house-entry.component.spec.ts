import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseEntryComponent } from './house-entry.component';

describe('HouseEntryComponent', () => {
  let component: HouseEntryComponent;
  let fixture: ComponentFixture<HouseEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
