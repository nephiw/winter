import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from '@ks89/angular-modal-gallery';
import { SelectableEntry } from 'common';

@Component({
  selector: 'bc-house-entry',
  templateUrl: './house-entry.component.html',
  styleUrls: ['./house-entry.component.less']
})
export class HouseEntryComponent {
  @Input() public house: SelectableEntry;
  @Input() public idx: number;
  @Output() select: EventEmitter<SelectableEntry> = new EventEmitter();

  constructor (
    private router: Router
  ) {}

  public hideMe(event): void {
    event.target.setAttribute('hidden', 'hidden');
  }

  public buildImages(paths): any[] {
    const imagePaths = paths.map((path) => `assets/images/houses/${ path }`);
    let imageId = 0;
    return imagePaths.map(img => {
      return new Image(++imageId, { img });
    });
  }

  public navigateToHouse(house): void {
    this.router.navigate(['house', 'detail', house.contactKey]);
  }
}
