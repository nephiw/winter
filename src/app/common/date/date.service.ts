import { Injectable, Inject } from '@angular/core';

@Injectable()
export class DateService {
  public voteCutoff: Date;
  public voteStart: Date;
  public houseCutoff: Date;
  private now: Date;

  constructor(@Inject('DateBuilder') private readonly dateBuilder: any) {
    this.now = this.dateBuilder.build();
    this.houseCutoff = this.dateBuilder.build('2019-12-14T23:55:00');
    this.voteStart = this.dateBuilder.build('2019-12-14T00:00:00');
    this.voteCutoff = this.dateBuilder.build('2019-12-22T17:00:00');
  }

  public isVotingLive(): boolean {
    const now = this.now.getTime();
    return this.voteStart.getTime() < now && now < this.voteCutoff.getTime();
  }

  public isHousesLive(): boolean {
    const now = this.now.getTime();
    return now < this.houseCutoff.getTime();
  }
}
