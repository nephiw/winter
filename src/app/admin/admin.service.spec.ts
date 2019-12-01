import { AngularFirestore } from '@angular/fire/firestore';

import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let db: jasmine.SpyObj<AngularFirestore>;

  beforeEach(() => {
    const collection = jasmine.createSpyObj('AngularFireCollection', [
      'valueChanges',
      'snapshotChanges'
    ]);
    db = jasmine.createSpyObj('AngularFirestore', ['collection']);
    db.collection.and.returnValue(collection);

    service = new AdminService(db);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
