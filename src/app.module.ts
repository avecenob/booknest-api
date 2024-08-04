import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { ReadListModule } from './read-list/read-list.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'baruna',
      database: 'booknest_test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BooksModule,
    UsersModule,
    AuthModule,
    ReadListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
