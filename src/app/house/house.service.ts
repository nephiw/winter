import { Injectable, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contact } from '../common/models/contact';
import { from, Observable } from 'rxjs';
import { map, first, tap } from 'rxjs/operators';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { HouseEntry } from '../common/models/house-entry';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(
    private db: AngularFirestore,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) { }

  public createHouse(house: Contact): Observable<string> {
    return from(this.saveContact(house)).pipe(map((documentRef) => {
      return documentRef.id;
    }));
  }

  private async saveContact(contact: Contact): Promise<any> {
    const createdAt = new Date();
    contact.createdAt = createdAt;
    const houseAddress = contact.houseAddress;
    const houseRef = await this.db.collection('contacts').add(contact);

    const entry = { contactKey: houseRef.id, createdAt, houseAddress, number: -1, imagePaths: [] };

    return this.db.collection('entries').add(entry);
  }

  public getEntries(): Observable<HouseEntry[]> {
    return this.db.collection<HouseEntry>('entries').valueChanges();
  }

  public getEntry(contactKey: string): Observable<any> {
    return this.getEntries().pipe(
      first(),
      map((entries) => {
        return entries.find(entry => entry.contactKey === contactKey);
      })
    );
  }

  public saveVote(entry: HouseEntry): Observable<HouseEntry> {
    this.storage.set('selected', JSON.stringify(entry));
    const voteKey = this.storage.get('uuid');
    let voteRef;
    if (voteKey) {
      voteRef = this.db.doc(`/votes/${ voteKey }`).update(entry);
    } else {
      voteRef = this.saveNewVote(entry);
    }

    return from(voteRef);
  }

  private async saveNewVote(entry: HouseEntry) {
    const voteRef = await this.db.collection('votes').add(entry);
    this.storage.set('uuid', voteRef.id);
    return voteRef;
  }
}
