import { fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { DetailPageGuard } from './detail-page.guard';

describe('DetailGuardGuard', () => {
  let guard: DetailPageGuard;
  let getEntriesSubject: BehaviorSubject<any>;
  let houseService: jasmine.SpyObj<any>;
  let route: jasmine.SpyObj<any>;

  beforeEach(() => {
    getEntriesSubject = new BehaviorSubject([
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 4 }
    ]);
    houseService = jasmine.createSpyObj('HouseService', ['getEntries']);
    houseService.getEntries.and.returnValue(getEntriesSubject.asObservable());

    route = jasmine.createSpyObj('Route', ['createUrlTree']);
    route.createUrlTree.and.callFake((values: any[]) => values.join('/'));
    guard = new DetailPageGuard(houseService, route);
  });

  it('returns true if the number is between the max and 0', fakeAsync(() => {
    const next = ({
      paramMap: { get: () => 2 }
    } as any) as ActivatedRouteSnapshot;
    const activateSpy = jasmine.createSpy('activate');
    guard.canActivate(next).subscribe(activateSpy);
    flushMicrotasks();

    expect(activateSpy).toHaveBeenCalledWith(true);
  }));

  it('returns a url tree with 1 if longer than max', fakeAsync(() => {
    const next = ({
      paramMap: { get: () => 6 }
    } as any) as ActivatedRouteSnapshot;
    const activateSpy = jasmine.createSpy('activate');
    guard.canActivate(next).subscribe(activateSpy);
    flushMicrotasks();

    expect(activateSpy).toHaveBeenCalledWith('house/1');
  }));

  it('returns a url tree with max if less than 0', fakeAsync(() => {
    const next = ({
      paramMap: { get: () => -1 }
    } as any) as ActivatedRouteSnapshot;
    const activateSpy = jasmine.createSpy('activate');
    guard.canActivate(next).subscribe(activateSpy);
    flushMicrotasks();

    expect(activateSpy).toHaveBeenCalledWith('house/4');
  }));
});
