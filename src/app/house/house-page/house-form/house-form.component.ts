import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoadingState } from '@common/constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HouseService } from '@app/house/house.service';
import { DateService } from '@app/common/date';

@Component({
  selector: 'bc-house-form',
  templateUrl: './house-form.component.html',
  styleUrls: ['./house-form.component.less']
})
export class HouseFormComponent implements OnInit {
  @Output() public stateChange: EventEmitter<LoadingState> = new EventEmitter();
  public houseForm: FormGroup;
  public signupCutoff = this.dateService.houseCutoff;
  public voteCutoff = this.dateService.voteCutoff;

  constructor(
    private readonly houseService: HouseService,
    private readonly dateService: DateService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.houseForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      houseAddress: new FormControl('', Validators.required),
      emailAddress: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phoneNumber: new FormControl('', Validators.required)
    });
  }

  public async submitSignupForm() {
    this.stateChange.emit(LoadingState.LOADING);

    if (this.houseForm.valid) {
      // Submit the form.
      this.houseService.createHouse(this.houseForm.value).subscribe((key) => {
        this.router.navigate(['house', 'complete']);
      });
    } else {
      console.log('tell the user why it is invalid');
    }
  }
}
