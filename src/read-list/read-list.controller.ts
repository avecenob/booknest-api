import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReadListService } from './read-list.service';
import { SaveListDto } from './dto/save-list.dto';
import { AuthGuard } from 'src/auth/auth.guard';

/**
 *
 * @TODO
 * 1. create and implement Authentication Guard
 *
 */

@UseGuards(AuthGuard)
@Controller('read-list')
export class ReadListController {
  constructor(private readListService: ReadListService) {}

  @Post()
  addBook(@Request() req) {
    return this.readListService.addList(req.body);
  }

  @Get()
  getList() {
    return this.readListService.getAll();
  }

  @Get(':id')
  getItemById(@Param() params: any) {
    return this.readListService.getItemById(params.id);
  }

  @Put(':id')
  updateItemById(@Param() params: any, @Body() saveListDto: SaveListDto) {
    return this.readListService.updateItemById(params.id, saveListDto);
  }

  @Delete(':id')
  deleteItemById(@Param() params: any) {
    return this.readListService.deleteItemById(params.id);
  }
}
