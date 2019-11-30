import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { flushMicrotasks, fakeAsync } from '@angular/core/testing';
import { createNativeDeferred, NativeDeferred } from '@test/utils';

describe('AuthService', () => {
  let service: AuthService;
  let afa: { auth: jasmine.SpyObj<FirebaseAuth> };
  let toastr: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    afa = {
      auth: jasmine.createSpyObj('FirebaseAuth', [
        'signInWithEmailAndPassword',
        'signOut',
        'onAuthStateChanged'
      ])
    };
    toastr = jasmine.createSpyObj('ToastrService', ['error']);

    service = new AuthService((afa as any) as AngularFireAuth, toastr);
  });

  describe('login', () => {
    it('forwards the login to FirebaseAuth', () => {
      service.login({ email: 'albert@example.com', password: 'Password' });
      expect(afa.auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        'albert@example.com',
        'Password'
      );
    });
  });

  describe('logout', () => {
    it('forwards teh login to FirebaseAuth', () => {
      service.logout();
      expect(afa.auth.signOut).toHaveBeenCalled();
    });
  });

  describe('isLoggedIn', () => {
    let resolveSpy: jasmine.Spy;
    let callback: any;

    beforeEach(() => {
      resolveSpy = jasmine.createSpy('resolve');
      service.isLoggedIn().then(resolveSpy);
      callback = afa.auth.onAuthStateChanged.calls.mostRecent().args[0];
    });

    it('should resolve to true if there is a user', fakeAsync(() => {
      callback({});
      flushMicrotasks();
      expect(resolveSpy).toHaveBeenCalledWith(true);
    }));

    it('should resolve to false if there is no user', fakeAsync(() => {
      callback(null);
      flushMicrotasks();
      expect(resolveSpy).toHaveBeenCalledWith(false);
    }));
  });

  describe('changePassword', () => {
    let currentUser: jasmine.SpyObj<firebase.User>;
    let signOutDeferred: NativeDeferred<void>;
    let signInDeferred: NativeDeferred<any>;
    let updatePasswordDeferred: NativeDeferred<any>;

    beforeEach(() => {
      currentUser = jasmine.createSpyObj('firebase.User', ['updatePassword']);
      currentUser.email = 'albert@example.com';
      afa.auth.currentUser = currentUser as firebase.User;

      signOutDeferred = createNativeDeferred();
      afa.auth.signOut.and.returnValue(signOutDeferred.promise);

      signInDeferred = createNativeDeferred();
      afa.auth.signInWithEmailAndPassword.and.returnValue(signInDeferred.promise);

      updatePasswordDeferred = createNativeDeferred();
      currentUser.updatePassword.and.returnValue(updatePasswordDeferred.promise);
    });

    it('starts by logging you out', () => {
      service.changePassword('oldPassword', 'newPassword');
      expect(afa.auth.signOut).toHaveBeenCalled();
    });

    it('logs you back in with the old password', fakeAsync(() => {
      service.changePassword('oldPassword', 'newPassword');
      signOutDeferred.resolve();
      flushMicrotasks();
      expect(afa.auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        'albert@example.com',
        'oldPassword'
      );
    }));

    it('calls updatePassword on the currentUser', fakeAsync(() => {
      service.changePassword('oldPassword', 'newPassword');
      signOutDeferred.resolve();
      flushMicrotasks();

      signInDeferred.resolve();
      flushMicrotasks();

      expect(currentUser.updatePassword).toHaveBeenCalledWith(
        'newPassword'
      );
    }));

    describe('when there are errors', () => {
      it('shows an error when logout fails', fakeAsync(() => {
        service.changePassword('oldPassword', 'newPassword');

        signOutDeferred.reject(new Error('Not Authenticated'));
        flushMicrotasks();

        expect(toastr.error).toHaveBeenCalled();
      }));

      it('shows an error when login fails', fakeAsync(() => {
        service.changePassword('oldPassword', 'newPassword');

        signOutDeferred.resolve();
        flushMicrotasks();

        signInDeferred.reject(new Error('Bad Old Password'));
        flushMicrotasks();

        expect(toastr.error).toHaveBeenCalled();
      }));

      it('shows an error when update fails', fakeAsync(() => {
        service.changePassword('oldPassword', 'newPassword');

        signOutDeferred.resolve();
        flushMicrotasks();

        signInDeferred.resolve();
        flushMicrotasks();

        updatePasswordDeferred.reject(new Error('Unfortunate Password'));
        flushMicrotasks();

        expect(toastr.error).toHaveBeenCalled();
      }));
    });
  });
});
