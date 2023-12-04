import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entity
import { Users } from './entity/users.entity';
// DTO
import { UserDto } from './dto/user.dto';
import { DbException } from '../../exceptions/DbException';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    try {
      return await this.userRepository.find({});
    } catch (err) {
      throw new DbException(err);
    }
  }

  async findById(id: number): Promise<Users> {
    try {
      return await this.userRepository.findOneBy({ id: id });
    } catch (err) {
      throw new DbException(err);
    }
  }

  async findByOpenId(open_id: string): Promise<Users> {
    try {
      return await this.userRepository.findOneBy({ open_id: open_id });
    } catch (err) {
      throw new DbException(err);
    }
  }

  async insert(user: UserDto): Promise<Users> {
    const newUser = new Users();

    Object.keys(user).forEach((key) => {
      newUser[key] = user[key];
    });

    try {
      return await this.userRepository.save(newUser);
    } catch (err) {
      throw new DbException(err);
    }
  }

  async update(oldUser: Users, updated_values: UserUpdateDto): Promise<Users> {
    const updatedUser = oldUser;

    Object.keys(updated_values).forEach((key) => {
      updatedUser[key] = updated_values[key];
    });

    try {
      return await this.userRepository.save(updatedUser);
    } catch (err) {
      throw new DbException(err);
    }
  }

  async delete(id: string) {
    try {
      return await this.userRepository.delete(id);
    } catch (err) {
      throw new DbException(err);
    }
  }
}
