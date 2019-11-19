import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';


const ORDINALS = {
  1: 'st',
  21: 'st',
  31: 'st',
  2: 'nd',
  22: 'nd',
  3: 'rd',
  23: 'rd'
};

@Pipe({
  name: 'ordinalDate', pure: true
})
export class OrdinalDatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  public transform(value: Date): string | null {
    const day = value.getDate();
    const ordinalIndicator = ORDINALS[day] || 'th';

    return formatDate(value, 'MMMM d', this.locale) + ordinalIndicator;
  }
}
