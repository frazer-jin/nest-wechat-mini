import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entity
import { Likes } from './entity/likes.entity';
// DTO
import { LikeDto } from './dto/like.dto';

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
      return err;
    }
  }

  async findById(id: string): Promise<Likes> {
    try {
      return await this.likeRepository.findOneById(id);
    } catch (err) {
      return err;
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
      return err;
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
      return err;
    }
  }

  async delete(id: string) {
    try {
      return await this.likeRepository.delete(id);
    } catch (err) {
      return err;
    }
  }
}
