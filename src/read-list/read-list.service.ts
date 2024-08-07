import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadList } from './read-list.entity';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';

/**
 *
 * @TODO
 *
 *
 */

@Injectable()
export class ReadListService {
  constructor(
    @InjectRepository(ReadList)
    private readlistRepository: Repository<ReadList>,
  ) {}

  async addList(listItem: ReadList) {
    if (listItem.id === 'new') {
      listItem.id = nanoid(16);
    }

    try {
      await this.readlistRepository.save(listItem);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }

    return {
      status: HttpStatus.CREATED,
      message: 'List added',
      data: listItem,
    };
  }

  async getAll() {
    const readLists: ReadList[] = await this.readlistRepository.find();

    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: readLists,
    };
  }

  async getItemById(id: string) {
    const listItem = await this.readlistRepository.findOneBy({ id });

    if (!listItem) {
      throw new NotFoundException('List item not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'List item found',
      data: listItem,
    };
  }

  async updateItemById(id: string, listItem: ReadList) {
    const listItemToUpdate = await this.readlistRepository.findOneBy({ id });

    if (!listItemToUpdate) {
      throw new NotFoundException('List item not found');
    }

    if (listItem.readStatus === 'finished') {
      listItemToUpdate.readPage = 0;
    }

    try {
      await this.readlistRepository.save(listItem);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }

    return {
      status: HttpStatus.OK,
      message: `List item with id: ${id} updated`,
    };
  }

  async deleteItemById(id: string) {
    const listItemToDelete = await this.readlistRepository.findOneBy({ id });

    if (!listItemToDelete) {
      throw new NotFoundException('List item not found');
    }

    try {
      await this.readlistRepository.remove(listItemToDelete);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }

    return {
      status: HttpStatus.OK,
      message: `List item with id: ${id} deleted`,
    };
  }
}
