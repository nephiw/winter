import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth-guard.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let service: AuthGuard;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    service = new AuthGuard(router, authService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('canActivate', () => {
    describe('when already authenticated', () => {
      it('returns true if logged in already', () => {
        authService.isLoggedIn.and.returnValue(true);
        expect(service.canActivate()).toBe(true);
      });
    });

    describe('when not authenticated', () => {
      beforeEach(() => {
        authService.isLoggedIn.and.returnValue(false);
      });

      it('redirects the user to the login page', () => {
        service.canActivate();
        expect(router.navigate).toHaveBeenCalledWith(['admin', 'login']);
      });

      it('returns false', () => {
        expect(service.canActivate()).toBe(false);
      });
    });
  });
});
