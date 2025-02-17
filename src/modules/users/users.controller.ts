import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import { UsersService } from './application/users.service';
import { CreateUserDto } from './application/dto/create-user.dto';
import { UpdateUserDto } from './application/dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { FilterQueryDto } from 'src/common/dtos/filter-query.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const { page, limit } = paginationQuery;
    return this.usersService.findAll(page, limit);
  }

  @Get('filter')
  filter(@Query() query: FilterQueryDto) {
    return this.usersService.filter(query);
  }

  @Post('reset-password')
  async requestPasswordReset(
    @Body() { email, password }: { email: string; password: string },
  ) {
    const token = await this.usersService.generatePasswordResetToken(
      email,
      password,
    );
    return { token };
  }
  private;

  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() { newPassword }: { newPassword: string },
  ) {
    return this.usersService.resetPassword(token, newPassword);
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string): Promise<void> {
    await this.usersService.softDelete(id);
  }
}
