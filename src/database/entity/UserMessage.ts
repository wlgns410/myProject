import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import TimeDefaultEntity from './TimeDefaultEntity';
import { User } from './Account';

@Entity()
export class UserMessage extends TimeDefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  userId: number;

  @Column({ nullable: true, length: 100 })
  unsentMessage: string;

  @Column({ nullable: true, length: 100 })
  reason: string;
}
