import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO } from 'date-fns';

@Pipe({
  name: 'formatDateProfile',
})
export class FormatDateProfilePipe implements PipeTransform {
  transform(input: string | undefined): string {
    if (!input) {
      return '';
    }
    const date = parseISO(input);
    return format(date, 'dd.MM.yyyy.');
  }
}
