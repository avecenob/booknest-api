import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReadListService } from './read-list.service';
import { SaveListDto } from './dto/save-list.dto';

/**
 *
 * @TODO
 * 1. create and implement Authentication Guard
 *
 */

@Controller('read-list')
export class ReadListController {
  constructor(private readListService: ReadListService) {}

  @Post()
  addBook(@Body() saveListDto: SaveListDto) {
    return this.readListService.addItem(saveListDto);
  }

  @Get()
  getList() {
    return this.readListService.getList();
  }

  @Get(':id')
  getListById() {}
}
