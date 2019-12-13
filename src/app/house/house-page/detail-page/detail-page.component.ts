import { Component, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from '@app/house/house.service';
import { concatMap, take, map } from 'rxjs/operators';
import { HouseEntry } from '@app/common/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'bc-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.less']
})
export class DetailPageComponent {
  public fullsized = false;
  public entryNumber: number;

  public house$ = this.route.params.pipe(
    concatMap(({ entry }) => {
      this.entryNumber = parseInt(entry, 10);
      return this.service.getHouseByEntry(this.entryNumber);
    })
  );

  @ViewChild('fullSize', { static: true })
  public fullSize: ElementRef;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: HouseService,
    private readonly toastr: ToastrService
  ) { }

  public grow(path: string): void {
    this.fullsized = true;
    const img = this.fullSize.nativeElement as HTMLImageElement;
    img.src = path;
  }

  public strink(): void {
    this.fullsized = false;
    const img = this.fullSize.nativeElement as HTMLImageElement;
    img.src = null;
  }

  public vote(entry: HouseEntry): void {
    this.service
      .saveVote(entry)
      .pipe(take(1))
      .subscribe(() => {
        this.toastr.success(
          `You have successfully voted for ${entry.houseAddress}. ` +
            `Clicking another house will update your vote.`
        );
      });
  }

  public previous(): void {
    this.router.navigate(['house', this.entryNumber - 1]);
  }

  public next(): void {
    this.router.navigate(['house', this.entryNumber + 1]);
  }
}
