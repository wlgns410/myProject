import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from 'typeorm';
  import TimeDefaultEntity from './TimeDefaultEntity';
  import { User } from './Account';
  
  @Entity()
  export class BodyMassIndex extends TimeDefaultEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL', onUpdate: 'SET NULL' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @Column()
    userId: number;
  
    @CreateDateColumn({ nullable: true })
    registrationDate: Date;
  
    @Column({ nullable: false, length: 3 })
    height: string | null;

    @Column({ nullable: false, length: 3 })
    weight: string;

    @Column({ nullable: true, length: 3 }) // 원하는 bmi 체형
    targetBody : string;
}
  