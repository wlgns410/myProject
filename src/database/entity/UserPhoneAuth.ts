import TimeDefaultEntity from './TimeDefaultEntity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserPhoneAuth extends TimeDefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 4  })
  authNums: string;

  @Column({ nullable: false, length: 11 })
  phone: string;
}
