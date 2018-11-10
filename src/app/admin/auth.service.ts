import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private service: AngularFireAuth,
    private toastr: ToastrService
  ) {}

  public login(credentials: { email: string, password: string }) {
    const { email, password } = credentials;
    return this.service.auth.signInWithEmailAndPassword( email, password );
  }

  public async logout(): Promise<void> {
    try {
      await this.service.auth.signOut();
    } catch (_error) { }
  }

  public isLoggedIn(): boolean {
    return !!this.service.auth.currentUser;
  }

  // Instead of loging out and back in before changing the password, which is required
  // to ensure the token is fresh, there exists a method called reauthenticateAndRetrieveDataWithCredential
  // but you have to pass it a Credential object and I can't figure out how to do that.
  public async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    try {
      const email = this.service.auth.currentUser.email;

      await this.logout();
      await this.login({ email, password: oldPassword });
      const user = this.service.auth.currentUser;
      await user.updatePassword(newPassword);
    } catch (_error) {
      this.toastr.error(`There was an error updating the password`);
    }
  }
}
