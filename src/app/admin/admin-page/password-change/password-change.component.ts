import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'admin/auth.service';

@Component({
  selector: 'bc-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.less']
})
export class PasswordChangeComponent implements OnInit {
  public changeForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.changeForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword1: new FormControl('', Validators.required),
      newPassword2: new FormControl('', Validators.required)
    });
  }

  public changePassword(): void {
    const { oldPassword, newPassword1 } = this.changeForm.value;

    this.auth.changePassword(oldPassword, newPassword1).then(() => {
      return this.router.navigate(['admin']);
    });
  }
}
