import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
// Controller
import { LikesController } from './likes.controller';
// Service
import { LikesService } from './likes.service';
// Entity
import { Likes } from './entity/likes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Likes]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
