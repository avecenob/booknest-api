import { Module } from '@nestjs/common';
import { ReadListService } from './read-list.service';
import { ReadListController } from './read-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadList } from './read-list.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReadList]), AuthModule],
  providers: [ReadListService],
  controllers: [ReadListController],
})
export class ReadListModule {}
