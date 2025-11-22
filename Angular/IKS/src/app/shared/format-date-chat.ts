// src/app/shared/format-date-chat.ts
import { differenceInDays, format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

export function formatDateChat(input: string | Date): string {
  const date = typeof input === 'string' ? parseISO(input) : input;
  const now = new Date();
  const timeFormatted = format(date, 'HH:mm');
  const dayDifference = differenceInDays(now, date);

  if (dayDifference === 0) {
    return timeFormatted;
  }
  if (dayDifference <= 7) {
    return `${format(date, 'EEE', { locale: enUS })}, ${timeFormatted}`;
  }
  // matching original fallback (DD.MM.YYYY. HH:mm)
  return format(date, 'dd.MM.yyyy. HH:mm');
}
