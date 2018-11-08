import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from 'common/models/contact';
import { HouseEntry } from 'common/models/house-entry';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private db: AngularFirestore
  ) {}

  public getAllContacts(): Observable < any[] > {
    const houseRef = this.db.collection('/houses').valueChanges();
    const contactsRef = this.db.collection('/contacts').valueChanges();

    return zip(houseRef, contactsRef).pipe(
      map(([houses, contacts]) => {
        const results = [];

        contacts.forEach((contact: Contact) => {
          const house = houses.find((h: HouseEntry) => h.houseAddress === contact.houseAddress) as HouseEntry;

          results.push(Object.assign({
            houseAddress: house ? house.houseAddress : ''
          }, contact));
        });
        return results;
      })
    );
  }

  // public getVotes(): Observable <any[]> {
  //   return this.db.collection('/houseVotes').valueChanges().pipe(
  //     map((houseVotes) => {
  //       return houseVotes.reduce((acc, currentValue) => {
  //         const key = (currentValue as any).address;
  //         acc[key] = acc[key] ? 1 + acc[key] : 1;
  //         return acc;
  //       }, {});
  //     }),
  //     map((countedGroups) => {
  //       return Object.keys(countedGroups).map((key) => ({ address: key, count: countedGroups[key] }));
  //     }),
  //     map((unsortedGroups) => {
  //       return unsortedGroups.sort((a, b) => {
  //         if (a.count < b.count) { return 1; }
  //         if (a.count === b.count) { return 0; }
  //         if (a.count > b.count) { return -1; }
  //       });
  //     })
  //   );
  // }
}
