import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/modules/users/domain/user.entity';

export class FilterQueryDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
