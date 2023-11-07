import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Controller
import { UsersController } from './users.controller';
// Service
import { UsersService } from './users.service';
// Entity
import { Users } from './entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
