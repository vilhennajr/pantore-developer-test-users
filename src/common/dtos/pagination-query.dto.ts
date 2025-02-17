import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1, { message: 'Page must not be less than 1' })
  page: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1, { message: 'Limit must not be less than 1' })
  @Max(100, { message: 'Limit must not be greater than 100' })
  limit: number = 10;
}
