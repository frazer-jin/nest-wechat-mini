import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entity
import { Pets } from './entity/pets.entity';
// DTO
import { PetDto } from './dto/pet.dto';

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
      return err;
    }
  }

  async findById(id: string): Promise<Pets> {
    try {
      return await this.petRepository.findOneById(id);
    } catch (err) {
      return err;
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
      return err;
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
      return err;
    }
  }

  async delete(id: string) {
    try {
      return await this.petRepository.delete(id);
    } catch (err) {
      return err;
    }
  }
}
