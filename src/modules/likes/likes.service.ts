import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entity
import { Likes } from './entity/likes.entity';
// DTO
import { LikeDto } from './dto/like.dto';
import { DbException } from 'src/exceptions/DbException';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Likes)
    private readonly likeRepository: Repository<Likes>,
  ) {}

  async findAll(): Promise<Likes[]> {
    try {
      return await this.likeRepository.find({});
    } catch (err) {
      throw new DbException(err);
    }
  }

  async findById(id: number): Promise<Likes> {
    try {
      return await this.likeRepository.findOneBy({ id: id });
    } catch (err) {
      throw new DbException(err);
    }
  }

  async findByTopicIdUserId(topic_id: number, user_id: number): Promise<Likes> {
    try {
      return await this.likeRepository.findOneBy({
        topic_id: topic_id,
        user_id: user_id,
      });
    } catch (err) {
      throw new DbException(err);
    }
  }

  async findCountByTopicId(topic_id: number): Promise<number> {
    try {
      return await this.likeRepository.count({
        where: {
          topic_id: topic_id,
        },
      });
    } catch (err) {
      throw new DbException(err);
    }
  }

  async insert(like: LikeDto): Promise<Likes> {
    const newLike = new Likes();

    Object.keys(like).forEach((key) => {
      newLike[key] = like[key];
    });

    try {
      return await this.likeRepository.save(newLike);
    } catch (err) {
      throw new DbException(err);
    }
  }

  async update(oldLike: Likes, updated_values: LikeDto): Promise<Likes> {
    const updatedLike = oldLike;

    Object.keys(updated_values).forEach((key) => {
      updatedLike[key] = updated_values[key];
    });

    try {
      return await this.likeRepository.save(updatedLike);
    } catch (err) {
      throw new DbException(err);
    }
  }

  async delete(id: number) {
    try {
      return await this.likeRepository.delete(id);
    } catch (err) {
      throw new DbException(err);
    }
  }
}
