import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'bc-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.less']
})
export class AdminPageComponent {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  public async logout() {
    await this.auth.logout();
    this.router.navigate(['admin', 'login']);
  }
}
