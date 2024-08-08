import { Book } from 'src/books/book.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class ReadList {
  @PrimaryColumn('char', { length: 16 })
  id: string;

  @Column('varchar')
  readStatus: 'planned' | 'reading' | 'finished';

  @Column('int', { nullable: true })
  readPage: number;

  @ManyToOne(() => Book, (book) => book.id, { nullable: false })
  book: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: string;
}
