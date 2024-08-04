import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { SaveBookDto } from './dto/save-book.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post()
  async save(@Body() saveBookDto: SaveBookDto) {
    return this.bookService.create(saveBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findById(@Param() params: any) {
    return this.bookService.findById(params.id);
  }

  @Put(':id')
  updateById(@Body() saveBookDto: SaveBookDto) {
    return this.bookService.updateById(saveBookDto);
  }

  @Delete(':id')
  deleteById(@Param() params: any) {
    return this.bookService.deleteById(params.id);
  }
}
