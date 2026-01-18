import { Pipe, PipeTransform } from '@angular/core';
import {
  differenceInMinutes,
  parseISO,
  differenceInHours,
  differenceInDays,
  format,
} from 'date-fns';

@Pipe({
  name: 'formatDatePost',
})
export class FormatDatePostPipe implements PipeTransform {
  transform(input: Date | string): string {
    const date = typeof input === 'string' ? parseISO(input) : input;
    const now = new Date();

    const mins = differenceInMinutes(now, date);
    if (mins < 60) return `${mins} minutes ago`;

    const hours = differenceInHours(now, date);
    if (hours < 24) return `${hours} hours ago`;

    const days = differenceInDays(now, date);
    if (days < 10) return `${days} days ago`;

    return format(date, 'yyyy-MM-dd HH:mm');
  }
}
