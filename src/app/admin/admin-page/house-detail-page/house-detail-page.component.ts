import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseEntry } from '@app/common/models';
import { AdminService } from '@app/admin/admin.service';

@Component({
  selector: 'bc-house-detail-page',
  templateUrl: './house-detail-page.component.html',
  styleUrls: ['./house-detail-page.component.less']
})
export class HouseDetailPageComponent implements OnInit {
  public num: number;
  public house: HouseEntry;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly adminService: AdminService
  ) {}

  ngOnInit() {
    this.num = parseInt(this.activatedRoute.snapshot.paramMap.get('num'), 10);
    this.adminService.getHouseByNumber(this.num).subscribe((houses: any) => {
      const house = houses[0];
      house.createdAt = house.createdAt.toMillis();
      this.house = house;
    });
  }
}
