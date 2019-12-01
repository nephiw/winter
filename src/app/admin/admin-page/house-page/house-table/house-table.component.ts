import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from '@app/admin/admin.service';

@Component({
  selector: 'bc-house-table',
  templateUrl: './house-table.component.html',
  styleUrls: ['./house-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseTableComponent {
  @Input() public houses: any[];

  constructor(private readonly adminService: AdminService) {}

  public changeSigned(house: any) {
    this.adminService.changeSigned(house.key, house.signed);
  }

  public changeEmailed(house: any) {
    this.adminService.changeEmailed(house.key, house.emailed);
  }

  public setNumber(house: any): void {
    this.adminService.setNumber(house.key, house.number);
  }
}
