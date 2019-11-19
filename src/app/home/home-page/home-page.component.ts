import { Component } from '@angular/core';
import { DateService } from '@app/common/date';

@Component({
  selector: 'bc-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent {
  constructor(private readonly dateService: DateService) {}

  public isVotingLive(): boolean {
    return this.dateService.isVotingLive();
  }

  public isHousesLive(): boolean {
    return this.dateService.isHousesLive();
  }
}
