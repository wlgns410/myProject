import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import TimeDefaultEntity from './TimeDefaultEntity';
import { User } from './Account';

@Entity()
export class UserLog extends TimeDefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL', onUpdate: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  userId: number;

  @CreateDateColumn({ nullable: true })
  signUpDate: Date;

  @UpdateDateColumn({ nullable: true })
  changePasswordDate: Date;

  @UpdateDateColumn({ nullable: true })
  changeUserTypeDate: Date;

  @UpdateDateColumn({ nullable: true })
  accessApplicationDate: Date;

  @UpdateDateColumn({ nullable: true })
  withdrawalDate: Date;

  @Column({ nullable: true })
  accessApplicationCount: number;

  @Column({ default: false })
  allowAlarm: boolean;
}
