import { Component, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseService } from '@app/house/house.service';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'bc-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.less']
})
export class DetailPageComponent {
  public fullsized = false;

  public house$ = this.route.params.pipe(
    concatMap(({ entry }) => {
      const houseEntry = parseInt(entry, 10);
      return this.service.getHouseByEntry(houseEntry);
    })
  );

  @ViewChild('fullSize', { static: true })
  public fullSize: ElementRef;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: HouseService
  ) {}

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
}
