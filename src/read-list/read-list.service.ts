import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadList } from './read-list.entity';
import { Repository } from 'typeorm';

/**
 *
 * @TODO
 * 1. complete addItem() method
 * 2. write methods for PUT, GET by id, and DELETE
 *
 */

@Injectable()
export class ReadListService {
  constructor(
    @InjectRepository(ReadList)
    private readlistRepository: Repository<ReadList>,
  ) {}

  async addItem(listItem: ReadList) {
    return {
      data: listItem,
    };
  }

  async getList() {
    const readList: ReadList[] = await this.readlistRepository.find();
    return {
      status: 200,
      message: 'success',
      data: readList,
    };
  }
}
