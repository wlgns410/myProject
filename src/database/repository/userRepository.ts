import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { injectable } from 'inversify';
import { User } from '../entity';

@injectable()
export class UserRepository extends Repository<User> {
    async isEmailExists(email: string): Promise<boolean> {
        const users = await this.find({
          where: { email },
        });
        if (users.length > 0) {
          return true;
        }
        return false;
    }
}
