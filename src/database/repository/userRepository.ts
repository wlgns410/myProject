import { Repository } from 'typeorm';
import { injectable } from 'inversify';
import { User } from '../entity';

@injectable()
export class UserRepository extends Repository<User> {
}
