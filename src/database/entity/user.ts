import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import TimeDefaultEntity from './TimeDefaultEntity';

@Entity()
export class User extends TimeDefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 150 })
  email: string | null;

  @Column({ nullable: true })
  password: string | null;

  @Column()
  name: string;

  @Column({ nullable: true, length: 11 })
  phone: string | null;
}
