import { Injectable, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contact } from '../common/models/contact';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

  // TODO - when a house is created, build a contact AND a house. The contact will have
  // contact information including the street address while the house will have decoration
  // information houseAddress, createdAt, contactKey, and imagePaths
  public createHouse(house: Contact): Observable<string> {
    house.createdAt = new Date();
    const houseRef = this.db.collection('contacts').add(house);
    return from(houseRef).pipe(map((documentRef) => {
      return documentRef.id;
    }));
  }

  public getHouses(): Observable<HouseEntry[]> {
    const housesRef = this.db.collection<HouseEntry>('houses');
    return housesRef.valueChanges().pipe(map((house) => {
      return Object.assign({ selected: false }, house);
    }));
  }

  public saveVote(house: HouseEntry): Observable<HouseEntry> {
    this.storage.set('selected', JSON.stringify(house));
    let voteKey = this.storage.get('uuid');
    if (voteKey) {
      this.db.doc(`/votes/${ voteKey }`).update(house);
    } else {
      const voteRef = this.db.collection('votes').add(house);
      from(voteRef).pipe(tap((documentRef) => {
        voteKey = documentRef.id;
        this.storage.set('uuid', documentRef.id);
        return documentRef.id;
      }));
    }

    return this.db.doc<HouseEntry>(`/votes/${ voteKey }`).valueChanges();
  }

  // const contactKey = this.contactService.generateKey(data);
  // const house = { contactKey, streetAddress: data.streetAddress };

  // await this.contactService.createNewContact(data);

  // const houses = this.db.object('/houses');
  // houses.update({ [ contactKey ]: house });

  // return this.db.object(`/houses/${ contactKey }`);



  // public createNewContact(data): AngularFireObject<Contact> {
    //   const contact = new Contact(data);
    //   const contactKey = this.generateKey(contact);
  //   contact.key = contactKey;
  //   const contacts = this.db.object('/contacts');
  //   contacts.update({ [ contactKey ]: contact });

  //   return this.db.object(`/contact/${ contactKey }`);
  // }

  // public generateKey(data: { emailAddress: string }): string {
  //   return data.emailAddress.replace(this.InvalidStringRegEx, '_');
  // }

  // public saveVote(house: HouseEntry): Observable <any> {
  //   let voteKey = this.storage.get('uuid');
  //   if (voteKey) {
  //     this.db.object(`/houseVotes/${ voteKey }`).update(house);
  //   } else {
  //     voteKey = this.db.list('houseVotes').push(house).key;
  //     this.storage.set('uuid', voteKey);
  //   }

  //   this.storage.set('selected', JSON.stringify(house));
  //   return this.db.object(`/houseVotes/${ voteKey }`).valueChanges();
  // }
}
