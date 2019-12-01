import { Injectable, Inject } from '@angular/core';

@Injectable()
export class DateService {
  public voteCutoff: Date;
  public houseCutoff: Date;
  private now: Date;

  constructor(@Inject('DateBuilder') private readonly dateBuilder: any) {
    this.now = this.dateBuilder.build();
    this.houseCutoff = this.dateBuilder.build('2019-12-08T23:55:00');
    this.voteCutoff = this.dateBuilder.build('2019-12-14T17:00:00');
  }

  public isVotingLive(): boolean {
    const now = this.now.getTime();
    return !this.isHousesLive() && now < this.voteCutoff.getTime();
  }

  public isHousesLive(): boolean {
    const now = this.now.getTime();
    return now < this.houseCutoff.getTime();
  }
}
