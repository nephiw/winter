import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'admin/auth.service';

@Component({
  selector: 'bc-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.less']
})
export class AdminPageComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  public logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
