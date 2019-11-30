import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'bc-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumberInputComponent,
      multi: true
    }
  ]
})
export class NumberInputComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  @Output() public numChange: EventEmitter<number> = new EventEmitter();

  @ViewChild('numInput', { static: true })
  public input: ElementRef;

  private sub: Subscription;
  private numValue: number;

  public get value(): number {
    return this.numValue;
  }

  public set value(val) {
    this.numValue = val;
    this.onChange(this.numValue);
    this.numChange.emit(this.numValue);
    this.onTouched();
  }

  public onChange: (_: any) => void = (_: any) => {};
  public onTouched: () => void = () => {};

  public ngOnInit(): void {
    this.sub = fromEvent(this.input.nativeElement, 'change')
      .pipe(
        map((event: any) => {
          return parseInt(event.target.value, 10);
        }),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((num) => {
        this.value = num;
      });
  }

  public writeValue(obj: any): void {
    this.value = obj;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.input.nativeElement.disabled = isDisabled;
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
