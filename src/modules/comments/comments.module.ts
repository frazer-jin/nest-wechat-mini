import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
// Controller
import { CommentsController } from './comments.controller';
// Service
import { CommentsService } from './comments.service';
// Entity
import { Comments } from './entity/comments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comments]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
