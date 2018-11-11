import { Component, OnInit, Inject } from '@angular/core';
import { take } from 'rxjs/operators';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { ToastrService } from 'ngx-toastr';
import { HouseService } from 'house/house.service';
import { SelectableEntry } from 'common';

@Component({
  selector: 'bc-vote-form',
  templateUrl: './vote-form.component.html',
  styleUrls: ['./vote-form.component.less']
})
export class VoteFormComponent implements OnInit {
  public entries: SelectableEntry[];

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private houseService: HouseService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.houseService.getEntries()
      .pipe(take(1))
      .subscribe((entries) => {
        this.entries = entries.sort((a, b) => {
          if (a.number < b.number) { return -1; }
          if (a.number === b.number) { return 0; }
          if (a.number > b.number) { return 1; }
        }).map((entry) => {
          return Object.assign({ selected: false }, entry);
        });
        const currentString = this.storage.get('selected');
        const currentSelection = currentString ? JSON.parse(currentString) : null;

        if (currentSelection) {
          const previousSelection = this.entries.find((house) => {
            return house.houseAddress === currentSelection.houseAddress;
          });
          previousSelection.selected = true;
        }
    });
  }

  public voteForEntry(entryVote: SelectableEntry): void {
    const { selected, ...entry } = entryVote;

    this.entries.forEach((house) => house.selected = false);
    entryVote.selected = true;

    this.houseService.saveVote(entry)
      .pipe(take(1))
      .subscribe((_results) => {
        this.toastr.success(
          `You have successfully voted for ${ entryVote.houseAddress }. ` +
          `Clicking another address will update your vote.`
        );
      });
  }
}
