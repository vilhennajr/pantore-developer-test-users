import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './application/users.service';
import { UsersController } from './users.controller';
import { PaginationService } from 'src/common/services/pagination.service';
import { UserEntity } from './domain/user.entity';
import { UserRepository } from './domain/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, PaginationService],
  exports: [UsersService],
})
export class UsersModule {}
