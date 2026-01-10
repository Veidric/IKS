import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../shared/classes/user';

@Pipe({
  name: 'filterUser',
  standalone: true
})
export class FilterUserPipe implements PipeTransform {

  transform(users: User[], searchTerm: string, selectedLetter: string): User[] {
    if (!users) return [];
    
    let result = users;

    if (selectedLetter) {
      result = result.filter(user => 
        user.Name?.toUpperCase().startsWith(selectedLetter) ||
        user.Username?.toUpperCase().startsWith(selectedLetter)
      );
    }

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.Name?.toLowerCase().includes(lowerTerm) ||
        user.Surname?.toLowerCase().includes(lowerTerm) ||
        user.Username?.toLowerCase().includes(lowerTerm)
      );
    }

    return result;
  }
}