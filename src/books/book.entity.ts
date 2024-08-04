import { ReadList } from 'src/read-list/read-list.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryColumn('char', { length: 10 })
  @OneToMany(() => ReadList, (readList) => readList.book)
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
}
