import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
      book.id = nanoid(16);
    }

    try {
      await this.bookRepository.save(book);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }

    return {
      status: HttpStatus.CREATED,
      message: 'Book created',
      data: book,
    };
  }

  async findAll() {
    const books: Book[] = await this.bookRepository.find();

    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: books,
    };
  }

  async findById(id: string) {
    const book: Book = await this.bookRepository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'Book found',
      data: book,
    };
  }

  async updateById(id: string, book: Book) {
    const bookToUpdate: Book = await this.bookRepository.findOneBy({ id });

    if (!bookToUpdate) {
      throw new NotFoundException('Book not found');
    }

    try {
      await this.bookRepository.save(book);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }

    return {
      status: HttpStatus.OK,
      message: `Book with id: ${book.id} updated`,
    };
  }

  async deleteById(id: string) {
    const bookToDelete: Book = await this.bookRepository.findOneBy({ id });

    if (!bookToDelete) {
      throw new NotFoundException('Book not found');
    }

    try {
      await this.bookRepository.remove(bookToDelete);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }

    return {
      status: HttpStatus.OK,
      message: `Book with id: ${id} deleted`,
    };
  }
}
