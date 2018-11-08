import { Component } from '@angular/core';
import { AdminService } from 'admin/admin.service';

@Component({
  selector: 'bc-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less']
})
export class ContactsComponent {
  public allContacts$ = this.admin.getAllContacts();

  constructor(
    private admin: AdminService
  ) { }
}
