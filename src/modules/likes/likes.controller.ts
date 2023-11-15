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
import { LikesService } from './likes.service';
// DTO
import { LikeDto } from './dto/like.dto';
import { LikeIdDto } from './dto/like-id.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get()
  async findAll(): Promise<LikeIdDto[]> {
    return (await this.likesService.findAll()) as LikeIdDto[];
  }

  @Get(':id')
  async findOneById(@Param() params): Promise<LikeIdDto> {
    return await this.likesService.findById(params.id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Request() req, @Body() like: LikeDto): Promise<LikeDto> {
    like.user_id = req.user.user_id;
    return (await this.likesService.insert(like)) as LikeDto;
  }

  @Put(':id')
  async update(
    @Body() updatedLike: LikeDto,
    @Param() params,
  ): Promise<LikeIdDto> {
    const oldLike = await this.likesService.findById(params.id);
    return await this.likesService.update(oldLike, updatedLike);
  }

  @Delete(':id')
  async delete(@Param() params) {
    return await this.likesService.delete(params.id);
  }
}
