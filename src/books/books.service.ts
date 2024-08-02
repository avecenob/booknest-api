import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/book.interface';
import { nanoid } from 'nanoid';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  save(book: Book) {
    if (book.id === 'new') {
      book.id = nanoid(10);
    }
    this.books.push(book);
    return { status: 201, message: 'book saved', data: book };
  }

  findAll() {
    return {
      status: 200,
      message: 'success',
      data: this.books,
    };
  }

  findById(id: string) {
    const book: Book = this.books.filter((book) => book.id === id)[0];
    return {
      status: 200,
      message: 'success',
      data: book,
    };
  }

  updateById(book: Book) {
    const index: number = this.books.findIndex((book) => book.id === book.id);
    if (index != -1) {
      this.books[index] = book;
    }
    return {
      status: 200,
      message: `book with id: ${book.id} updated`,
      data: book,
    };
  }

  deleteById(id: string) {
    const index: number = this.books.findIndex((book) => book.id === id);
    if (index != -1) {
      this.books.splice(index, 1);
    }
    return {
      status: 200,
      message: `book with id: ${id} deleted`,
    };
  }
}
