export class Comment {
  id: number = 0;
  Username: string = '';
  Content: string = '';

  constructor(id: number, username: string, content: string) {
    this.id = id;
    this.Username = username;
    this.Content = content;
  }
}
