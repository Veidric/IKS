import { format, parseISO } from 'date-fns';

export class DateFormating {
  static formatDateForInput(dateString: string): string {
    const date = parseISO(dateString);
    return format(date, 'yyyy-MM-dd');
  }

  static formatDateForDisplay(dateString: string): string {
    const date = parseISO(dateString);
    return format(date, 'dd.MM.yyyy.');
  }
}
