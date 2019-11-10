import {
  TestBed,
  inject,
  flushMicrotasks,
  fakeAsync
} from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { User } from 'firebase';
import { NativeDeferred, createNativeDeferred } from 'src/test/utils';
import { FirebaseAuth } from '@angular/fire';

describe('AuthService', () => {
  let angularFireAuth: AngularFireAuth;
  let auth: jasmine.SpyObj<FirebaseAuth>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let service: AuthService;

  let signOutDeferred: NativeDeferred<void>;
  let signInDeferred: NativeDeferred<any>;

  beforeEach(() => {
    signOutDeferred = createNativeDeferred();
    signInDeferred = createNativeDeferred();

    auth = jasmine.createSpyObj('AngularFireAuth', [
      'signInWithEmailAndPassword',
      'signOut'
    ]);

    angularFireAuth = ({
      auth,
      currentUser: null
    } as unknown) as AngularFireAuth;

    toastrService = jasmine.createSpyObj('ToastrService', ['error']);

    service = new AuthService(angularFireAuth, toastrService);

    auth.signOut.and.returnValue(signOutDeferred.promise);
    auth.signInWithEmailAndPassword.and.returnValue(signInDeferred.promise);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    let onLoginSpy: jasmine.Spy;
    let onLoginErrorSpy: jasmine.Spy;

    beforeEach(() => {
      onLoginSpy = jasmine.createSpy('onLogout');
      onLoginErrorSpy = jasmine.createSpy('onLogoutError');
      service
        .login({ email: 'albert@example.com', password: 'password' })
        .then(onLoginSpy, onLoginErrorSpy);
    });

    it('calls sign in for firebase', fakeAsync(() => {
      expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        'albert@example.com',
        'password'
      );
      signInDeferred.resolve();
      flushMicrotasks();
      expect(onLoginSpy).toHaveBeenCalled();
    }));

    it('does not swallow the error', fakeAsync(() => {
      signInDeferred.reject();
      flushMicrotasks();

      expect(onLoginSpy).not.toHaveBeenCalled();
      expect(onLoginErrorSpy).toHaveBeenCalled();
    }));
  });

  describe('logout', () => {
    let onLogoutSpy: jasmine.Spy;
    let onLogoutErrorSpy: jasmine.Spy;

    beforeEach(() => {
      onLogoutSpy = jasmine.createSpy('onLogout');
      onLogoutErrorSpy = jasmine.createSpy('onLogoutError');
      service.logout().then(onLogoutSpy, onLogoutErrorSpy);
    });

    it('calls signOut on auth', fakeAsync(() => {
      expect(angularFireAuth.auth.signOut).toHaveBeenCalled();
      signOutDeferred.resolve();
      flushMicrotasks();
      expect(onLogoutSpy).toHaveBeenCalled();
    }));

    it('captures errors', fakeAsync(() => {
      signOutDeferred.reject();
      flushMicrotasks();

      expect(onLogoutSpy).toHaveBeenCalled();
      expect(onLogoutErrorSpy).not.toHaveBeenCalled();
    }));
  });

  describe('isLoggedIn', () => {
    it('returns false if there is no current user', () => {
      angularFireAuth.auth.currentUser = null;
      expect(service.isLoggedIn()).toBe(false);
    });

    it('returns true if there is a current user', () => {
      angularFireAuth.auth.currentUser = {} as User;
      expect(service.isLoggedIn()).toBe(true);
    });
  });

  describe('changePassword', () => {
    let updatePasswordDeferred: NativeDeferred<any>;

    beforeEach(() => {
      updatePasswordDeferred = createNativeDeferred();
      auth.currentUser = ({
        email: 'albert@example.com',
        updatePassword: jasmine.createSpy('updatePassword')
      } as unknown) as User;

      (auth.currentUser.updatePassword as jasmine.Spy).and.returnValue(
        updatePasswordDeferred.promise
      );
    });

    it('logs out of the current user', () => {
      service.changePassword('oldPassword', 'newPassword');
      expect(auth.signOut).toHaveBeenCalled();
    });

    it('logs in with the email and old password', fakeAsync(() => {
      service.changePassword('oldPassword', 'newPassword');
      signOutDeferred.resolve();
      flushMicrotasks();

      expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        'albert@example.com',
        'oldPassword'
      );
    }));

    it('calls updatePassword on the current user', fakeAsync(() => {
      service.changePassword('oldPassword', 'newPassword');
      signOutDeferred.resolve();
      flushMicrotasks();

      signInDeferred.resolve();
      flushMicrotasks();

      expect(auth.currentUser.updatePassword).toHaveBeenCalledWith(
        'newPassword'
      );
    }));

    it('resolves', fakeAsync(() => {
      const resolveSpy = jasmine.createSpy('resolve');
      service.changePassword('oldPassword', 'newPassword').then(resolveSpy);
      signOutDeferred.resolve();
      flushMicrotasks();

      signInDeferred.resolve();
      flushMicrotasks();

      updatePasswordDeferred.resolve();
      flushMicrotasks();

      expect(resolveSpy).toHaveBeenCalled();
    }));

    describe('when rejected', () => {
      beforeEach(fakeAsync(() => {
        service.changePassword('oldPassword', 'newPassword');
        signOutDeferred.resolve();
        flushMicrotasks();
      }));

      it('shows a toastr error when login fails', fakeAsync(() => {
        signInDeferred.reject();
        flushMicrotasks();

        expect(toastrService.error).toHaveBeenCalled();
      }));

      it('shows a toastr error when update fails', fakeAsync(() => {
        signInDeferred.resolve();
        flushMicrotasks();

        updatePasswordDeferred.reject();
        flushMicrotasks();

        expect(toastrService.error).toHaveBeenCalled();
      }));
    });
  });
});
