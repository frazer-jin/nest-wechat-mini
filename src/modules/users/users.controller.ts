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
import { UsersService } from './users.service';
// DTO
import { UserDto } from './dto/user.dto';
import { UserIdDto } from './dto/user-id.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserIdDto[]> {
    return (await this.usersService.findAll()) as UserIdDto[];
  }

  @Get(':id')
  async findOneById(@Param() params): Promise<UserIdDto> {
    return await this.usersService.findById(params.id);
  }

  @Post()
  async create(@Body() user: UserDto): Promise<UserDto> {
    return (await this.usersService.insert(user)) as UserDto;
  }

  @Put(':id')
  async update(
    @Body() updatedUser: UserUpdateDto,
    @Param() params,
  ): Promise<UserIdDto> {
    const oldUser = await this.usersService.findById(params.id);
    return await this.usersService.update(oldUser, updatedUser);
  }

  @Delete(':id')
  async delete(@Param() params) {
    return await this.usersService.delete(params.id);
  }
}
