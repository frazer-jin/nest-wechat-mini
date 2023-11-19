import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entity
import { Pets } from './entity/pets.entity';
// DTO
import { PetDto } from './dto/pet.dto';
import { DbException } from 'src/exceptions/DbException';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pets)
    private readonly petRepository: Repository<Pets>,
  ) {}

  async findAll(): Promise<Pets[]> {
    try {
      return await this.petRepository.find({});
    } catch (err) {
      throw new DbException(err);
    }
  }

  async findByUserId(user_id: number): Promise<Pets[]> {
    try {
      return await this.petRepository.findBy({ user_id: user_id });
    } catch (err) {
      throw new DbException(err);
    }
  }

  async findById(id: number): Promise<Pets> {
    try {
      return await this.petRepository.findOneBy({ id: id });
    } catch (err) {
      throw new DbException(err);
    }
  }

  async insert(pet: PetDto): Promise<Pets> {
    const newPet = new Pets();

    Object.keys(pet).forEach((key) => {
      newPet[key] = pet[key];
    });

    try {
      return await this.petRepository.save(newPet);
    } catch (err) {
      throw new DbException(err);
    }
  }

  async update(oldPet: Pets, updated_values: PetDto): Promise<Pets> {
    const updatedPet = oldPet;

    Object.keys(updated_values).forEach((key) => {
      updatedPet[key] = updated_values[key];
    });

    try {
      return await this.petRepository.save(updatedPet);
    } catch (err) {
      throw new DbException(err);
    }
  }

  async delete(id: string) {
    try {
      return await this.petRepository.delete(id);
    } catch (err) {
      throw new DbException(err);
    }
  }
}
