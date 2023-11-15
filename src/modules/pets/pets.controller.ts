import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  @UseGuards(AuthGuard())
  async create(@Request() req, @Body() pet: PetDto): Promise<PetDto> {
    pet.user_id = req.user.user_id;
    return (await this.petsService.insert(pet)) as PetDto;
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async update(@Body() updatedPet: PetDto, @Param() params): Promise<PetIdDto> {
    const oldPet = await this.petsService.findById(params.id);
    return await this.petsService.update(oldPet, updatedPet);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async delete(@Param() params) {
    const pet = await this.petsService.findById(params.id);
    await this.petsService.delete(params.id);
    return pet;
  }
}
