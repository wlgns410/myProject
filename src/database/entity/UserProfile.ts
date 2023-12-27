import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import TimeDefaultEntity from './TimeDefaultEntity';
import { User } from './Account';

@Entity()
export class UserProfile extends TimeDefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  userId: number;

  @Column({ nullable: true, length: 100 })
  image: string;

  @Column({ nullable: true, length: 6 })
  postalAddress: string;

  @Column({ nullable: true, length: 50 })
  roadNameAddress: string;
}
