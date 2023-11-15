import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
// Controller
import { PetsController } from './pets.controller';
// Service
import { PetsService } from './pets.service';
// Entity
import { Pets } from './entity/pets.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pets]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService],
})
export class PetsModule {}
