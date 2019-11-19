import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
  public voteCutoff: Date;
  public houseCutoff: Date;
  private now: Date;

  constructor() {
    this.now = new Date();
    this.houseCutoff = new Date('2019-12-08T23:55:00');
    this.voteCutoff = new Date('2019-12-14T17:00:00');
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
