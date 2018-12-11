import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'bc-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.less']
})
export class ContactsTableComponent implements OnChanges {
  @Input() public contacts: any[];
  public totalHouses = 0;
  public totalVotes = 0;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.contacts && changes.contacts.currentValue) {
      if (this.contacts) {
        this.totalHouses = this.contacts.reduce((accumulator: number, current: any) => {
          return accumulator + (current.houseAddress ? 1 : 0);
        }, 0);
        this.totalVotes = this.contacts.reduce((accumulator: number, current: any) => {
          return accumulator + current.votes;
        }, 0);
      } else {
        this.totalHouses = 0;
      }
    }
  }

  public sortByNumber(): void {
    this.sortAscending('number');
  }

  public sortByFirstName(): void {
    this.sortAscending('firstName');
  }

  public sortByLastName(): void {
    this.sortAscending('lastName');
  }

  public sortByVotes(): void {
    this.sortDescending('votes');
  }

  public sortByCreation(): void {
    this.sortAscending('createdAt');
  }

  private sortAscending(key: string): void {
    this.contacts.sort((a, b) => {
      if (a[key] < b[key]) { return -1; }
      if (a[key] === b[key]) { return 0; }
      if (a[key] > b[key]) { return 1; }
    });
  }

  private sortDescending(key: string): void {
    this.contacts.sort((a, b) => {
      if (a[key] < b[key]) { return 1; }
      if (a[key] === b[key]) { return 0; }
      if (a[key] > b[key]) { return -1; }
    });
  }
}
