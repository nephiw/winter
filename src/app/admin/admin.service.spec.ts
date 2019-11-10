import { AngularFirestore } from '@angular/fire/firestore';

import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let db: jasmine.SpyObj<AngularFirestore>;

  beforeEach(() => {
    db = jasmine.createSpyObj('AngularFirestore', ['collection']);

    service = new AdminService(db);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
