import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DetailPageComponent } from './detail-page.component';
import { HouseService } from '@app/house/house.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';

describe('DetailPageComponent', () => {
  let component: DetailPageComponent;
  let fixture: ComponentFixture<DetailPageComponent>;
  let route: any;
  let paramsSubject: Subject<any>;
  let router: jasmine.SpyObj<Router>;
  let houseService: jasmine.SpyObj<HouseService>;
  let entriesSubject: Subject<any>;
  let toastr: jasmine.SpyObj<ToastrService>;

  beforeEach(async(() => {
    paramsSubject = new Subject();
    route = { params: paramsSubject.asObservable() };

    router = jasmine.createSpyObj('Router', ['navigate']);
    houseService = jasmine.createSpyObj('HouseService', [
      'getHouseByEntry',
      'getEntries'
    ]);
    entriesSubject = new Subject();
    houseService.getEntries.and.returnValue(entriesSubject.asObservable());
    toastr = jasmine.createSpyObj('ToastrService', ['success']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DetailPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: route },
        { provide: Router, useValue: router },
        { provide: HouseService, useValue: houseService },
        { provide: ToastrService, useValue: toastr }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
