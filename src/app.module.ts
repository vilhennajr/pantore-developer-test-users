import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AppDataSource } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), UsersModule],
})
export class AppModule {}
