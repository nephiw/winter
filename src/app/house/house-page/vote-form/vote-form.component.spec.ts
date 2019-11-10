import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteFormComponent } from './vote-form.component';
import { MockComponents } from 'ng-mocks';
import { HouseEntryComponent } from './house-entry';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { HouseService } from '@app/house/house.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

describe('VoteFormComponent', () => {
  let component: VoteFormComponent;
  let fixture: ComponentFixture<VoteFormComponent>;
  let storage: jasmine.SpyObj<StorageService>;
  let houseService: jasmine.SpyObj<HouseService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  let getEntriesSubject: Subject<any>;
  let saveVoteSubject: Subject<any>;

  beforeEach(async(() => {
    getEntriesSubject = new Subject();
    saveVoteSubject = new Subject();

    storage = jasmine.createSpyObj('Storage', ['get']);
    houseService = jasmine.createSpyObj('HouseService', ['getEntries', 'saveVote']);
    houseService.getEntries.and.returnValue(getEntriesSubject.asObservable());
    houseService.saveVote.and.returnValue(saveVoteSubject.asObservable());

    toastrService = jasmine.createSpyObj('ToastrService', ['success']);

    TestBed.configureTestingModule({
      declarations: [ VoteFormComponent, MockComponents(HouseEntryComponent) ],
      providers: [
        { provide: LOCAL_STORAGE, useValue: storage },
        { provide: HouseService, useValue: houseService },
        { provide: ToastrService, useValue: toastrService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
