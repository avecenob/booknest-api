import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(user: User) {
    if (user.id === 'new') {
      user.id = nanoid(16);
    }

    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      status: 201,
      message: 'user created',
      data: user,
    };
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async updateById(user: User) {
    const { id } = user;
    const userToUpdate: User = await this.userRepository.findOneBy({ id });
    await this.userRepository.save(userToUpdate);
    return {
      status: 200,
      message: `user with id: ${id} updated`,
    };
  }

  async deleteById(id: string) {
    await this.userRepository.delete(id);
    return {
      status: 200,
      message: `user with id: ${id} deleted.`,
    };
  }
}
