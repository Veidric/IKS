import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../shared/classes/user';

@Pipe({
  name: 'paginateUser',
  standalone: true
})
export class PaginateUserPipe implements PipeTransform {

  transform(users: User[], currentPage: number, pageSize: number): User[] {
    if (!users) return [];
    
    const startIndex = (currentPage - 1) * pageSize;
    return users.slice(startIndex, startIndex + pageSize);
  }
}