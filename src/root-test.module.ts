import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './modules/comments/comments.service';
import { Comments } from './modules/comments/entity/comments.entity';
import { CommentsController } from './modules/comments/comments.controller';
import { LikesController } from './modules/likes/likes.controller';
import { LikesService } from './modules/likes/likes.service';
import { PetsController } from './modules/pets/pets.controller';
import { PetsService } from './modules/pets/pets.service';
import { TopicsController } from './modules/topics/topics.controller';
import { TopicsService } from './modules/topics/topics.service';
import { UsersController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { Likes } from './modules/likes/entity/likes.entity';
import { Pets } from './modules/pets/entity/pets.entity';
import { Topics } from './modules/topics/entity/topics.entity';
import { Users } from './modules/users/entity/users.entity';

@Module({
  providers: [
    CommentsController,
    CommentsService,
    LikesController,
    LikesService,
    PetsController,
    PetsService,
    TopicsController,
    TopicsService,
    UsersController,
    UsersService,
  ],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        logging: false,
        entities: [Comments],
      }),
    }),
    TypeOrmModule.forFeature([Comments, Likes, Pets, Topics, Users]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class RootTestModule {}
