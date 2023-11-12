import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
// Service
import { PetsService } from './pets.service';
// DTO
import { PetDto } from './dto/pet.dto';
import { PetIdDto } from './dto/pet-id.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  async findAll(): Promise<PetIdDto[]> {
    return (await this.petsService.findAll()) as PetIdDto[];
  }

  @Get(':id')
  async findOneById(@Param() params): Promise<PetIdDto> {
    return await this.petsService.findById(params.id);
  }

  @Post()
  async create(@Body() pet: PetDto): Promise<PetDto> {
    return (await this.petsService.insert(pet)) as PetDto;
  }

  @Put(':id')
  async update(@Body() updatedPet: PetDto, @Param() params): Promise<PetIdDto> {
    const oldPet = await this.petsService.findById(params.id);
    return await this.petsService.update(oldPet, updatedPet);
  }

  @Delete(':id')
  async delete(@Param() params) {
    const pet = await this.petsService.findById(params.id);
    await this.petsService.delete(params.id);
    return pet;
  }
}
