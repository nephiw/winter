import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'bc-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.less']
})
export class LoadingComponent implements OnInit, OnDestroy {
  @Input() public progress: Observable<number>; // a number between 0 and 100;
  public percentage$: Observable<number>;

  @ViewChild('completion', { static: true })
  public completion: ElementRef;

  private progressSub: Subscription;

  public ngOnInit(): void {
    const nativeCompletion = this.completion.nativeElement;
    this.progressSub = this.progress.subscribe(val => {
      const width = nativeCompletion.parentElement.offsetWidth;
      const percentWidth = (val / 100) * width;
      nativeCompletion.style.width = `${percentWidth}px`;

      const percent = Math.floor((val * 10)) / 10;
      nativeCompletion.textContent = ` ${ percent }%`;
    });
  }

  public ngOnDestroy(): void {
    if (this.progressSub) {
      this.progressSub.unsubscribe();
    }
  }
}
