import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HouseEntryComponent } from './house-entry.component';
import { GalleryModule } from '@ks89/angular-modal-gallery';

describe('HouseEntryComponent', () => {
  let component: HouseEntryComponent;
  let fixture: ComponentFixture<HouseEntryComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, GalleryModule.forRoot()],
      declarations: [HouseEntryComponent],
      providers: [{ provide: Router, useValue: router }]
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
