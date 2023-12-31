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
  Query,
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
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ): Promise<PetIdDto[]> {
    return (await this.petsService.findAll(
      Math.max(page, 1),
      limit < 1 ? 20 : limit,
    )) as PetIdDto[];
  }

  @Get('keyword')
  async findSome(
    @Query() query,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ): Promise<PetIdDto[]> {
    const keyword = query.q;
    return (await this.petsService.searchByName(
      keyword,
      Math.max(page, 1),
      limit < 1 ? 20 : limit,
    )) as PetIdDto[];
  }

  @Get('mine')
  @UseGuards(AuthGuard())
  async findMine(@Request() req): Promise<PetIdDto[]> {
    const user_id = req.user.user_id;
    return (await this.petsService.findByUserId(user_id)) as PetIdDto[];
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
