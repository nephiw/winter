import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from '@app/admin/admin.service';

@Component({
  selector: 'bc-contacts',
  templateUrl: './contacts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent {
  public allContacts$ = this.admin.getContacts();

  constructor(private readonly admin: AdminService) { }
}
