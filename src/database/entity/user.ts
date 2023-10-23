import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import bcrypt from 'bcrypt';
import TimeDefaultEntity from './TimeDefaultEntity';

@Entity()
export class User extends TimeDefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 30 })
  email: string;

  @Column({ nullable: false, length: 30 })
  password: string;

  @Column({ nullable: true, length: 30  })
  nickname: string | null;

  @Column({ nullable: false, length: 11 })
  phone: string;

  @BeforeInsert()
  async savePasswordWithEncrypt() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 5);
    }
  }

  async comparePassword(password: string) {
    const result = await bcrypt.compare(password, this.password);
    return result;
  }
}
