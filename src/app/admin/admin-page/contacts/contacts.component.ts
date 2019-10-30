import { Component } from '@angular/core';
import { AdminService } from '@app/admin/admin.service';
import { AuthService } from '@app/admin/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bc-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less']
})
export class ContactsComponent {
  public allContacts$ = this.admin.getAllContacts();

  constructor(
    private admin: AdminService,
    private auth: AuthService,
    private router: Router
  ) { }

  public logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
