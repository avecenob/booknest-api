import { Book } from 'src/books/book.entity';
import { User } from 'src/users/user.entity';

export class SaveListDto {
  id: string;
  readStatus: 'planned' | 'reading' | 'finished';
  readPage: number;
  book: Book;
  user: User;
}
