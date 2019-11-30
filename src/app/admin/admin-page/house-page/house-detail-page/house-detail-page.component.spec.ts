import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseDetailPageComponent } from './house-detail-page.component';
import { AdminService } from '@app/admin/admin.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MockComponents } from 'ng-mocks';
import { PhotoEditorComponent } from './photo-editor';

describe('HouseDetailPageComponent', () => {
  let component: HouseDetailPageComponent;
  let fixture: ComponentFixture<HouseDetailPageComponent>;
  let adminService: jasmine.SpyObj<AdminService>;
  let houseSubject: Subject<any>;
  let activatedRoute: any;

  beforeEach(async(() => {
    houseSubject = new Subject();
    adminService = jasmine.createSpyObj('AdminService', ['getHouseByNumber']);
    adminService.getHouseByNumber.and.returnValue(houseSubject.asObservable());

    const paramMap = jasmine.createSpyObj('ParamMap', ['get']);
    paramMap.get.and.returnValue(2);
    activatedRoute = { snapshot: { paramMap } };

    TestBed.configureTestingModule({
      declarations: [HouseDetailPageComponent, MockComponents(PhotoEditorComponent)],
      providers: [
        { provide: AdminService, useValue: adminService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
