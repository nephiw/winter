import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import { MockComponents } from 'ng-mocks';

import { EditableHouseEntry } from '@app/common/models';
import { AdminService } from '@app/admin/admin.service';
import { PhotoEditorComponent } from './photo-editor.component';
import { LoadingComponent } from '../loading';
import { UploadButtonComponent } from '../upload-button/upload-button.component';

describe('PhotoEditorComponent', () => {
  let component: PhotoEditorComponent;
  let fixture: ComponentFixture<PhotoEditorComponent>;
  let adminService: jasmine.SpyObj<AdminService>;
  let storage: jasmine.SpyObj<AngularFireStorage>;

  beforeEach(async(() => {
    adminService = jasmine.createSpyObj('AdminService', ['updateHouse']);
    storage = jasmine.createSpyObj('AngularFireStorage', ['ref']);

    TestBed.configureTestingModule({
      declarations: [
        PhotoEditorComponent,
        MockComponents(LoadingComponent, UploadButtonComponent)
      ],
      providers: [
        { provide: AdminService, useValue: adminService },
        { provide: AngularFireStorage, useValue: storage }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoEditorComponent);
    component = fixture.componentInstance;
    component.house = { id: 'test-id', imagePaths: [] } as EditableHouseEntry;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
