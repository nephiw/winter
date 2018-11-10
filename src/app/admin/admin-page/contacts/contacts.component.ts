import { Component } from '@angular/core';
import { AdminService } from 'admin/admin.service';
import { AuthService } from 'admin/auth.service';

@Component({
  selector: 'bc-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less']
})
export class ContactsComponent {
  public allContacts$ = this.admin.getAllContacts();

  constructor(
    private admin: AdminService,
    private auth: AuthService
  ) { }

  public logout(): void {
    this.auth.logout();
  }
}
