import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AdminService } from '@app/admin/admin.service';

@Component({
  selector: 'bc-house-page',
  templateUrl: './house-page.component.html',
  styleUrls: ['./house-page.component.less']
})
export class HousePageComponent {
  public houses$ = this.admin.getHouseContacts();
  public totalHouses$: Observable<number> = this.houses$.pipe(map(houses => houses.length));

  constructor(
    private readonly admin: AdminService
  ) { }
}
