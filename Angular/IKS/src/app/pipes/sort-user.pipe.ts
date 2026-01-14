import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../shared/classes/user';

@Pipe({
  name: 'sortUser',
  standalone: true
})
export class SortUserPipe implements PipeTransform {

  transform(users: User[], column: string, direction: 'asc' | 'desc'): User[] {
    if (!users || !column) return users;

    return [...users].sort((a, b) => {
      const valA = (a as any)[column];
      const valB = (b as any)[column];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return direction === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      }
      
      return direction === 'asc' ? valA - valB : valB - valA;
    });
  }
}