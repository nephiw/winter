import { flushMicrotasks, fakeAsync } from '@angular/core/testing';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { StorageService } from 'ngx-webstorage-service';
import { Observable, Subject } from 'rxjs';
import { NativeDeferred, createNativeDeferred } from '@test/utils';
import { HouseService } from './house.service';
import { Contact, HouseEntry } from '@app/common/models';

describe('HouseService', () => {
  let service: HouseService;
  let db: jasmine.SpyObj<AngularFirestore>;
  let storage: jasmine.SpyObj<StorageService>;

  let collection: jasmine.SpyObj<AngularFirestoreCollection>;
  let doc: jasmine.SpyObj<AngularFirestoreDocument>;

  let addDeferred: NativeDeferred<any>;
  let entriesSubject: Subject<any>;
  let valueChangesObservable: Observable<any>;
  let updateDeferred: NativeDeferred<any>;

  beforeEach(() => {
    addDeferred = createNativeDeferred();
    updateDeferred = createNativeDeferred();
    entriesSubject = new Subject();
    valueChangesObservable = entriesSubject.asObservable();

    collection = jasmine.createSpyObj('Collection', ['add', 'valueChanges']);
    collection.add.and.returnValue(addDeferred.promise);
    collection.valueChanges.and.returnValue(valueChangesObservable);
    doc = jasmine.createSpyObj('Doc', ['update']);
    doc.update.and.returnValue(updateDeferred.promise);

    db = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc']);
    db.collection.and.returnValue(collection);
    db.doc.and.returnValue(doc);

    storage = jasmine.createSpyObj('LocalStorage', ['set', 'get']);

    service = new HouseService(db, storage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createHouse', () => {
    let contact: Contact;

    beforeEach(() => {
      contact = {
        houseAddress: '1600 Amphitheatre Parkway',
        firstName: 'Albert',
        lastName: 'Adams',
        emailAddress: 'albert@exmaple.com'
      } as Contact;
      service.createHouse(contact);
    });

    it('fetches contacts list to add the new contact', () => {
      expect(db.collection).toHaveBeenCalledWith('contacts');
      expect(collection.add).toHaveBeenCalledWith(contact);
    });

    describe('after the contact has been added', () => {
      beforeEach(fakeAsync(() => {
        addDeferred.resolve({ id: 0 });
        flushMicrotasks();
      }));

      it('fetches entries list and adds a new entry', () => {
        expect(db.collection).toHaveBeenCalledWith('entries');
        expect(collection.add).toHaveBeenCalledWith({
          contactKey: 0,
          createdAt: jasmine.any(Date),
          houseAddress: contact.houseAddress,
          number: -1,
          imagePaths: []
        });
      });
    });
  });

  describe('getEntries', () => {
    it('returns the valueChanges observable', () => {
      const result = service.getEntries();

      expect(db.collection).toHaveBeenCalledWith('entries');
      expect(collection.valueChanges).toHaveBeenCalled();
      expect(result).toBe(valueChangesObservable);
    });
  });

  describe('getEntry', () => {
    let entrySpy: jasmine.Spy;

    beforeEach(() => {
      entrySpy = jasmine.createSpy('entry');
      service.getHouseByContact('contact-key').subscribe(entrySpy);
    });

    it('fetches all of the entries', () => {
      service.getHouseByContact('contact-key');

      expect(db.collection).toHaveBeenCalledWith('entries');
      expect(collection.valueChanges).toHaveBeenCalled();
    });

    it('maps the results to the one we are looking for', fakeAsync(() => {
      entriesSubject.next([
        { contactKey: 'nope-key' },
        { contactKey: 'still-nope-key' },
        { contactKey: 'contact-key' }
      ]);
      flushMicrotasks();

      expect(entrySpy).toHaveBeenCalledWith({ contactKey: 'contact-key' });
    }));
  });

  describe('saveVote', () => {
    let entry: HouseEntry;

    beforeEach(() => {
      entry = {
        contactKey: 'contact-key',
        houseAddress: '',
        number: 0,
        imagePaths: []
      } as HouseEntry;
      service.saveVote(entry);
    });

    it('sets the entry on local storage', () => {
      service.saveVote(entry);
      expect(storage.set).toHaveBeenCalledWith(
        'selected',
        JSON.stringify(entry)
      );
    });

    describe('when the uuid exists in storage', () => {
      let updateSpy: jasmine.Spy;

      beforeEach(() => {
        updateSpy = jasmine.createSpy('update');
        storage.get.and.returnValue('vote-uuid');
        service.saveVote(entry).subscribe(updateSpy);
      });

      it('fetches the vote and updates it', () => {
        expect(db.doc).toHaveBeenCalledWith('/votes/vote-uuid');
        expect(doc.update).toHaveBeenCalledWith(entry);
      });

      it('returns the value of the vote ref', fakeAsync(() => {
        updateDeferred.resolve({ key: '' });
        flushMicrotasks();

        expect(updateSpy).toHaveBeenCalledWith({ key: '' });
      }));
    });

    describe('when the uuid does not exist in storage', () => {
      let updateSpy: jasmine.Spy;

      beforeEach(() => {
        updateSpy = jasmine.createSpy('update');
        storage.get.and.returnValue(null);
        service.saveVote(entry).subscribe(updateSpy);
      });

      it('does not fetch the vote nor update it', () => {
        expect(db.doc).not.toHaveBeenCalled();
        expect(doc.update).not.toHaveBeenCalled();
      });

      it('returns the value of the vote ref', fakeAsync(() => {
        expect(db.collection).toHaveBeenCalledWith('votes');
        expect(collection.add).toHaveBeenCalledWith(entry);
      }));

      it('stores the value of the vote', fakeAsync(() => {
        addDeferred.resolve({ id: 5 });
        flushMicrotasks();
        expect(storage.set).toHaveBeenCalledWith('uuid', 5);
      }));
    });
  });
});
