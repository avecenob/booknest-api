import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async create(book: Book) {
    if (book.id === 'new') {
      book.id = nanoid(10);
    }

    try {
      await this.bookRepository.save(book);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return { status: 201, message: 'book saved', data: book };
  }

  async findAll() {
    const books: Book[] = await this.bookRepository.find();
    return {
      status: 200,
      message: 'success',
      data: books,
    };
  }

  async findById(id: string) {
    const book: Book = await this.bookRepository.findOneBy({ id });
    return {
      status: 200,
      message: 'success',
      data: book,
    };
  }

  async updateById(book: Book) {
    const { id } = book;
    const bookToUpdate: Book = await this.bookRepository.findOneBy({ id });
    if (!bookToUpdate) {
      throw new HttpException('book not found', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.bookRepository.save(book);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      status: 200,
      message: `book with id: ${book.id} updated`,
      data: book,
    };
  }

  async deleteById(id: string) {
    const bookToDelete: Book = await this.bookRepository.findOneBy({ id });
    if (!bookToDelete) {
      throw new HttpException('book not found', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.bookRepository.delete(bookToDelete);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      status: 200,
      message: `book with id: ${id} deleted`,
    };
  }
}
