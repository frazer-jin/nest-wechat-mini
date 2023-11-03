import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Environment
import { ENV as env } from './env/env';
// import { BooksModule } from './modules/books/books.module';
import { PetsModule } from './modules/pets/pets.module';
import { Books } from './modules/books/entity/books.entity';
import { Pets } from './modules/pets/entity/pets.entity';
import { Topics } from './modules/topics/entity/topics.entity';
import { TopicsModule } from './modules/topics/topics.module';
import { Comments } from './modules/comments/entity/comments.entity';
import { CommentsModule } from './modules/comments/comments.module';
import { Likes } from './modules/likes/entity/likes.entity';
import { LikesModule } from './modules/likes/likes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.database.host,
      port: env.database.port,
      username: env.database.username,
      password: env.database.password,
      database: 'nestjs_books_api',
      entities: [Books, Pets, Topics, Comments, Likes],
      synchronize: true,
    }),
    // BooksModule,
    PetsModule,
    TopicsModule,
    CommentsModule,
    LikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
