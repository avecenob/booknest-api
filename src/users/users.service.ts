import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
      throw new InternalServerErrorException();
    }

    return {
      status: HttpStatus.CREATED,
      message: 'User created',
      data: user,
    };
  }

  async findAll() {
    const users: User[] = await this.userRepository.find();

    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: users,
    };
  }

  async findById(id: string) {
    const user: User = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'User found',
      data: user,
    };
  }

  async updateById(id: string, user: User) {
    const userToUpdate: User = await this.userRepository.findOneBy({ id });

    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }

    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
    return {
      status: HttpStatus.OK,
      message: `User with id: ${id} updated`,
    };
  }

  async deleteById(id: string) {
    const userToDelete = await this.userRepository.findOneBy({ id });

    if (!userToDelete) {
      throw new NotFoundException('User not found');
    }

    try {
      await this.userRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }

    return {
      status: HttpStatus.OK,
      message: `User with id: ${id} deleted.`,
    };
  }
}
