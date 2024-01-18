import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import TimeDefaultEntity from './TimeDefaultEntity';
import { BodyMassIndex } from './BodyMassIndex';

@Entity()
export class DailyCalorie extends TimeDefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BodyMassIndex, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'bmi_id' })
  bmi: BodyMassIndex;

  @Column()
  bmiId: number;

  @Column({ type: 'decimal', precision: 6, scale: 1, nullable: true }) // 정수 5자리 소수점 1자리까지
  carbohydrate: string | null;

  @Column({ type: 'decimal', precision: 6, scale: 1, nullable: true })
  protein: string;

  @Column({ type: 'decimal', precision: 6, scale: 1, nullable: true })
  lipid: string;

  @Column({ type: 'decimal', precision: 7, scale: 1, nullable: true })
  calorie: string;

  @Column('simple-json', { nullable: true })
  foods: { food: string; quantity: number }[];
}
