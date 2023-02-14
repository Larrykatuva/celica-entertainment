import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { PaginationInterface } from '../../shared/interfaces/pagination.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Get User by filter options.
   * Returns a user object.
   * @param filterOptions
   */
  async getUser(filterOptions: any): Promise<User> {
    return await this.userRepository.findOneBy({ ...filterOptions });
  }

  /**
   * Filter Users by filter options.
   * Returns a list of users
   * @param pagination
   * @param filterOptions
   */
  async filterPaginatedUsers(
    pagination: PaginationInterface = { skip: 0, take: 10 },
    filterOptions?: any,
  ): Promise<[User[], number]> {
    return await this.userRepository.findAndCount({
      ...filterOptions,
      ...pagination,
    });
  }

  /**
   * Create a user record in the database.
   * @param user
   */
  async createUser(user: User): Promise<User> {
    const exists = await this.getUser({ email: user.email });
    if (!exists)
      throw new HttpException(
        'User email already exists',
        HttpStatus.BAD_REQUEST,
      );
    return await this.userRepository.save(user);
  }

  /**
   * Update user matching filter options by supplied update fields.
   * @param filterOption
   * @param updateFields
   */
  async updateUser(
    filterOption: any,
    updateFields: Partial<User>,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(
      { ...filterOption },
      { ...updateFields },
    );
  }
}
