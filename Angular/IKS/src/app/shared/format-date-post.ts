// src/app/shared/format-date-post.ts
import { differenceInDays, differenceInHours, differenceInMinutes, format, parseISO } from 'date-fns';

export function formatDatePost(input: string | Date): string {
  const date = typeof input === 'string' ? parseISO(input) : input;
  const now = new Date();

  const mins = differenceInMinutes(now, date);
  if (mins < 60) return `${mins} minutes ago`;

  const hours = differenceInHours(now, date);
  if (hours < 24) return `${hours} hours ago`;

  const days = differenceInDays(now, date);
  if (days < 10) return `${days} days ago`;

  return format(date, 'dd.MM.yyyy. HH:mm');
}
