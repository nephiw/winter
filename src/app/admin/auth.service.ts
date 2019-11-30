import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';

interface Credentials {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly service: AngularFireAuth,
    private readonly toastr: ToastrService
  ) {}

  public login(credentials: Credentials): Promise<any> {
    const { email, password } = credentials;
    return this.service.auth.signInWithEmailAndPassword(email, password);
  }

  public async logout(): Promise<void> {
    try {
      await this.service.auth.signOut();
    } catch (error) {}
  }

  public isLoggedIn(): Promise<boolean> {
    return new Promise((resolve: any) => {
      this.service.auth.onAuthStateChanged(( user: any ) => {
        user ? resolve(true) : resolve(false);
      });
    });
  }

  // Instead of loging out and back in before changing the password, which is required
  // to ensure the token is fresh, there exists a method called reauthenticateAndRetrieveDataWithCredential
  // but you have to pass it a Credential object and I can't figure out how to do that.
  public async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const { email } = this.service.auth.currentUser;

      await this.service.auth.signOut();
      await this.service.auth.signInWithEmailAndPassword(email, oldPassword);
      const { currentUser } = this.service.auth;
      await currentUser.updatePassword(newPassword);
    } catch (error) {
      this.toastr.error(`There was an error updating the password`);
    }
  }
}
