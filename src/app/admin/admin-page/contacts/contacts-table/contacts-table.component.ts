import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'bc-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.less']
})
export class ContactsTableComponent implements OnChanges {
  @Input() public contacts: any[];
  public totalHouses = 0;

  public showHouses = true;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.contacts && changes.contacts.currentValue) {
      if (this.contacts) {
        this.totalHouses = this.contacts.reduce((accumulator: number, current: any) => {
          return accumulator + (current.houseAddress ? 1 : 0);
        }, 0);
      } else {
        this.totalHouses = 0;
      }
    }
  }
}
