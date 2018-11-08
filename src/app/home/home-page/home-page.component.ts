import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bc-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {
  public acceptingHouses = false;
  public acceptingVotes = false;

  ngOnInit() {
    const now = (new Date()).getTime();

    const houseCutoff = new Date('2018-12-08T23:55:00');
    const voteCutoff = new Date('2018-12-15T17:00:00');

    this.acceptingHouses = now < houseCutoff.getTime();
    this.acceptingVotes = !this.acceptingHouses && now < voteCutoff.getTime();
  }
}
