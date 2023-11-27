import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entity
import { Comments } from './entity/comments.entity';
// DTO
import { CommentDto } from './dto/comment.dto';
import { DbException } from 'src/exceptions/DbException';

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
      throw new DbException(err);
    }
  }

  async findById(id: number): Promise<Comments> {
    try {
      return await this.commentRepository.findOneBy({ id: id });
    } catch (err) {
      throw new DbException(err);
    }
  }

  async findByTopicId(topic_id: number): Promise<Comments[]> {
    try {
      return await this.commentRepository.find({
        where: {
          topic_id: topic_id,
        },
      });
    } catch (err) {
      throw new DbException(err);
    }
  }

  async findCountByTopicId(topic_id: number): Promise<number> {
    try {
      return await this.commentRepository.count({
        where: {
          topic_id: topic_id,
        },
      });
    } catch (err) {
      throw new DbException(err);
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
      throw new DbException(err);
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
      throw new DbException(err);
    }
  }

  async delete(id: number) {
    try {
      return await this.commentRepository.delete(id);
    } catch (err) {
      throw new DbException(err);
    }
  }

  async deleteByTopicId(topic_id: number) {
    try {
      return await this.commentRepository.delete({
        topic_id: topic_id,
      });
    } catch (err) {
      throw new DbException(err);
    }
  }
}
