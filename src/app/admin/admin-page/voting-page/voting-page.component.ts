import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from '@app/admin/admin.service';

@Component({
  selector: 'bc-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.less']
})
export class VotingPageComponent {
  public houses$: Observable<any[]> = this.adminService.getVotingResults();

  constructor(private readonly adminService: AdminService) { }
}
