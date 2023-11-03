import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entity
import { Comments } from './entity/comments.entity';
// DTO
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
  ) {}

  async findAll(): Promise<Comments[]> {
    try {
      return await this.commentRepository.find({});
    } catch (err) {
      return err;
    }
  }

  async findById(id: string): Promise<Comments> {
    try {
      return await this.commentRepository.findOneById(id);
    } catch (err) {
      return err;
    }
  }

  async insert(comment: CommentDto): Promise<Comments> {
    const newComment = new Comments();

    Object.keys(comment).forEach((key) => {
      newComment[key] = comment[key];
    });

    try {
      return await this.commentRepository.save(newComment);
    } catch (err) {
      return err;
    }
  }

  async update(
    oldComment: Comments,
    updated_values: CommentDto,
  ): Promise<Comments> {
    const updatedComment = oldComment;

    Object.keys(updated_values).forEach((key) => {
      updatedComment[key] = updated_values[key];
    });

    try {
      return await this.commentRepository.save(updatedComment);
    } catch (err) {
      return err;
    }
  }

  async delete(id: string) {
    try {
      return await this.commentRepository.delete(id);
    } catch (err) {
      return err;
    }
  }
}
