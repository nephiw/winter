import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { HouseService } from '@app/house/house.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class DetailPageGuard implements CanActivate {
  public length$ = this.admin
    .getEntries()
    .pipe(map(entries => entries.length));

  constructor(private readonly admin: HouseService, private readonly router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    // Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    return this.length$.pipe(map((length: number) => {
      const nextNumber = parseInt(next.paramMap.get('entry'), 10);
      if (nextNumber >= length) {
        return this.router.createUrlTree(['house', 1]);
      } else if (nextNumber <= 0) {
        return this.router.createUrlTree(['house', length - 1]);
      } else {
        return true;
      }
    }));
  }
}
