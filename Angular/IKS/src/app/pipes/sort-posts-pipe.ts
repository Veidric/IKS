import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../shared/classes/post';

@Pipe({
  name: 'sortPosts',
})
export class SortPostsPipe implements PipeTransform {
  transform(posts: Post[], sortKey: string): Post[] {
    if (sortKey !== 'date') {
      return posts.sort((a, b) => +b.Rating - +a.Rating);
    } else if (sortKey === 'date') {
      return posts.sort((a, b) => +new Date(b.DateOfPosting) - +new Date(a.DateOfPosting));
    }
    return posts;
  }
}
