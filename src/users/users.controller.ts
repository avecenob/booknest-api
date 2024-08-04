import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SaveUserDto } from './dto/save-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async save(@Body() saveUserDto: SaveUserDto) {
    return this.userService.create(saveUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param() params: any) {
    return this.userService.findById(params.id);
  }

  @Put(':id')
  updateById(@Body() saveUserDto: SaveUserDto) {
    return this.userService.updateById(saveUserDto);
  }

  @Delete(':id')
  deleteById(@Param() params: any) {
    return this.userService.deleteById(params.id);
  }
}
