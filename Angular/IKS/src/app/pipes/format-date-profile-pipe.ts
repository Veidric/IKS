import { Pipe, PipeTransform } from '@angular/core';
import { DateFormating } from '../shared/date-formating';

@Pipe({
  name: 'formatDateProfile',
})
export class FormatDateProfilePipe implements PipeTransform {
  transform(input: string | undefined): string {
    if (!input) {
      return '';
    }
    return DateFormating.formatDateForDisplay(input);
  }
}
