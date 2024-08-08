import { ReadList } from 'src/read-list/read-list.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryColumn('char', { length: 16 })
  id: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  author: string;

  @Column('int')
  year: number;

  @Column('text')
  summary: string;

  @Column('varchar')
  publisher: string;

  @Column('int')
  pageCount: number;

  @OneToMany(() => ReadList, (readList) => readList.book)
  readLists?: ReadList[];
}
