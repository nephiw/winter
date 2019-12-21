import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { HouseService } from '@app/house/house.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class DetailPageGuard implements CanActivate {
  public length$ = this.admin.getEntries().pipe(
    map(entries => {
      return entries.reduce(
        (currentMax: any, value: any) =>
          currentMax.number > value.number ? currentMax : value,
        { number: 0 }
      ).number;
    })
  );

  constructor(
    private readonly admin: HouseService,
    private readonly router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.length$.pipe(
      map((maxNumber: number) => {
        const nextNumber = parseInt(next.paramMap.get('entry'), 10);
        if (nextNumber > maxNumber) {
          return this.router.createUrlTree(['house', 1]);
        } else if (nextNumber <= 0) {
          return this.router.createUrlTree(['house', maxNumber]);
        } else {
          return true;
        }
      })
    );
  }
}
