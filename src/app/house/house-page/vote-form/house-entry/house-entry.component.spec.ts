import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HouseEntryComponent } from './house-entry.component';

describe('HouseEntryComponent', () => {
  let component: HouseEntryComponent;
  let fixture: ComponentFixture<HouseEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HouseEntryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseEntryComponent);
    component = fixture.componentInstance;

    component.house = {
      houseAddress: '',
      number: 1,
      selected: false,
      imagePaths: [],
      contactKey: '',
      createdAt: new Date()
    };

    component.idx = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
