import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../shared/classes/user';

@Pipe({
  name: 'filterUser',
  standalone: true,
})
export class FilterUserPipe implements PipeTransform {
  transform(users: User[], searchTerm: string, selectedLetter: string): User[] {
    if (!users) return [];

    let result = users;

    if (selectedLetter) {
      result = result.filter(
        (user) =>
          user.name?.toUpperCase().startsWith(selectedLetter) ||
          user.username?.toUpperCase().startsWith(selectedLetter)
      );
    }

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.name?.toLowerCase().includes(lowerTerm) ||
          user.surname?.toLowerCase().includes(lowerTerm) ||
          user.username?.toLowerCase().includes(lowerTerm)
      );
    }

    return result;
  }
}
