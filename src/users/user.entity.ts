import { ReadList } from 'src/read-list/read-list.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn('char', { length: 16 })
  @OneToMany(() => ReadList, (readList) => readList.user)
  id: string;

  @Column('varchar')
  username: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  role: string;
}
