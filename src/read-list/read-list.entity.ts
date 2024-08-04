import { Book } from 'src/books/book.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class ReadList {
  @PrimaryColumn('char', { length: 10 })
  id: string;

  @Column('varchar')
  readStatus: 'planned' | 'reading' | 'finished';

  @Column('int')
  readPage: number;

  @ManyToOne(() => Book, (book) => book.id)
  book: Book;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
