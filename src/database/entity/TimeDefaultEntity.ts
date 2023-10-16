import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export default class TimeDefaultEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
