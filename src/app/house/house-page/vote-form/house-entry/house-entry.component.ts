import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from '@ks89/angular-modal-gallery';
import { SelectableEntry } from '@common/models';

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
    let imageId = 0;
    return paths.map((path) => {
      const fullPath = `assets/images/houses/${ this.house.number }`;
      const image = `${ fullPath }/${ path }`;
      const thumb = `${ fullPath }/tb_${ path }`;

      return new Image(++imageId, { img: image, description: this.house.houseAddress }, { img: thumb });
    });
  }

  public navigateToHouse(house): void {
    this.router.navigate(['house', 'detail', house.contactKey]);
  }
}
