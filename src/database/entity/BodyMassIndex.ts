import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import TimeDefaultEntity from './TimeDefaultEntity';
import { User } from './Account';

@Entity()
export class BodyMassIndex extends TimeDefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  userId: number;

  @Column({ type: 'decimal', precision: 4, scale: 1, nullable: true }) // 정수 3자리 소수점 1자리까지
  height: string | null;

  @Column({ type: 'decimal', precision: 4, scale: 1, nullable: true }) // 정수 3자리 소수점 1자리까지
  weight: string;

  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true }) // 정수 2자리 소수점 1자리까지
  bmiTarget: string;

  @Column({ type: 'decimal', precision: 4, scale: 1, nullable: true }) // 정수 3자리 소수점 1자리까지
  targetDifference: string;

  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true }) // 정수 2자리 소수점 1자리까지
  bmrTarget: string;

  @Column({ type: 'decimal', precision: 6, scale: 1, nullable: true }) // 정수 2자리 소수점 1자리까지
  calories: string;

  @Column({ nullable: true, length: 15 })
  activityType: string;
}
