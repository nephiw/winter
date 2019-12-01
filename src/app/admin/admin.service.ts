import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '@common/models/contact';
import { HouseEntry } from '@common/models/house-entry';
import { EditableHouseEntry } from '@app/common/models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private contactsRef: Observable<any> = this.db
    .collection('/contacts')
    .valueChanges();
  private entriesRef: Observable<any> = this.db
    .collection('/entries')
    .valueChanges();
  private votesRef: Observable<any> = this.db
    .collection('/votes')
    .valueChanges();

  private entriesSnapshots: Observable<any> = this.db
    .collection('/entries')
    .snapshotChanges();

  private byCount: (a: any, b: any) => number;
  private byTimestamp: (a: any, b: any) => number;
  private byEmail: (a: any, b: any) => number;

  private objectSort(prop: string, a: any, b: any): number {
    if (a[prop] > b[prop]) {
      return 1;
    }
    if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  }

  constructor(private readonly db: AngularFirestore) {
    this.byCount = this.objectSort.bind(this, 'count');
    this.byTimestamp = this.objectSort.bind(this, 'createdAt');
    this.byEmail = this.objectSort.bind(this, 'email');
  }

  public getContacts(): Observable<any[]> {
    return zip(this.entriesRef, this.contactsRef).pipe(
      map(([entries, contacts]) => {
        const results = [];

        contacts.forEach((contact: Contact) => {
          const house = entries.find(
            (h: HouseEntry) => h.houseAddress === contact.houseAddress
          ) as HouseEntry;

          results.push(
            Object.assign(
              {
                contactKey: house.contactKey,
                houseAddress: house ? house.houseAddress : '',
                number: house.number,
                createdAt: house.createdAt
              },
              contact
            )
          );
        });
        return results;
      })
    );
  }

  public getVotingResults(): Observable<any[]> {
    return zip(this.entriesRef, this.contactsRef, this.votesRef).pipe(
      map(([entries, contacts, votes]) => {
        const results = [];

        contacts.forEach((contact: Contact) => {
          const house = entries.find(
            (h: HouseEntry) => h.houseAddress === contact.houseAddress
          ) as HouseEntry;

          results.push({
            number: house.number,
            firstName: contact.firstName,
            lastName: contact.lastName,
            emailAddress: contact.emailAddress,
            houseAddress: contact.houseAddress,
            votes: votes ? this.getVoteCount(votes, house.houseAddress) : 0
          });
        });
        return results;
      })
    );
  }

  private getVoteCount(votes: any[], houseAddress: string): number {
    return votes.reduce((acc, vote) => {
      if ((vote as any).houseAddress === houseAddress) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  public getHouse(key: string): Observable<HouseEntry> {
    return this.db.doc<HouseEntry>(`/entries/${key}`).valueChanges();
  }

  public getHouseByNumber(num: number): Observable<any[]> {
    return this.db
      .collection('entries', ref => ref.where('number', '==', num))
      .snapshotChanges()
      .pipe(
        map(results =>
          results.map(({ payload }) =>
            Object.assign({ id: payload.doc.id }, payload.doc.data())
          )
        )
      );
  }

  public updateHouse(key: string, value: Partial<HouseEntry>): Promise<void> {
    return this.db.doc<HouseEntry>(`/entries/${key}`).update(value);
  }

  public getHouseContacts(): Observable<any[]> {
    return zip(this.entriesSnapshots, this.contactsRef).pipe(
      map(([entrySnapshots, contacts]) => {
        const results = [];

        const entries = entrySnapshots.map(({ payload }) => {
          return Object.assign({ id: payload.doc.id }, payload.doc.data());
        });

        entries.forEach((house: EditableHouseEntry) => {
          const contact = contacts.find(
            (c: Contact) => house.houseAddress === c.houseAddress
          );

          results.push({
            key: house.id,
            number: house.number || 0,
            houseAddress: house.houseAddress,
            createdAt: house.createdAt.toMillis(),
            emailed: house.emailed,
            signed: house.signed,
            firstName: contact.firstName,
            lastName: contact.lastName,
            emailAddress: contact.emailAddress
          });
        });
        results.sort(this.byTimestamp);
        return results;
      })
    );
  }

  public changeEmailed(key: string, emailed: boolean): void {
    this.db.doc(`/entries/${key}`).update({ emailed });
  }

  public changeSigned(key: string, signed: boolean): void {
    this.db.doc(`/entries/${key}`).update({ signed });
  }

  public setNumber(key: string, num: number): void {
    this.db.doc(`/entries/${key}`).update({ number: num });
  }
}
