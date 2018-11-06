import { Component, OnInit, Inject } from '@angular/core';
import { take } from 'rxjs/operators';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { ToastrService } from 'ngx-toastr';
import { HouseService } from 'house/house.service';
import { HouseEntry } from 'common/models/house-entry';

@Component({
  selector: 'bc-vote-form',
  templateUrl: './vote-form.component.html',
  styleUrls: ['./vote-form.component.less']
})
export class VoteFormComponent implements OnInit {
  public houses: HouseEntry[];

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private houseService: HouseService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.houseService.getHouses()
      .pipe(take(1))
      .subscribe((houses) => {
        this.houses = houses.sort((a, b) => {
          if (a.number < b.number) { return -1; }
          if (a.number === b.number) { return 0; }
          if (a.number > b.number) { return 1; }
        });
        const currentString = this.storage.get('selected');
        const currentSelection = currentString ? JSON.parse(currentString) : null;

        if (currentSelection) {
          const previousSelection = this.houses.find((house) => house.houseAddress === currentSelection.houseAddress);
          // previousSelection.selected = true;
        }
    });
  }

  public onHouseSelected(selectedHouse: HouseEntry): void {
    // this.houses.forEach((house) => house.selected = false);
    // selectedHouse.selected = true;
    this.houseService.saveVote(selectedHouse)
      .pipe(take(1))
      .subscribe((_results) => {
        this.toastr.success(
          `You have successfully voted for ${ selectedHouse.houseAddress }. ` +
          `Clicking another address will update your vote.`
        );
      });
  }
}
