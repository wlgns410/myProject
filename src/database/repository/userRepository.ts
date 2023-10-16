import { Repository } from 'typeorm';
import { injectable } from 'inversify';
import { User } from '../entity';

@injectable()
export default class UserRepository extends Repository<User> {
}
