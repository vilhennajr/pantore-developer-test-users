import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  paginate<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
  ): { data: T[]; meta: { total: number; page: number; lastPage: number } } {
    const lastPage = Math.ceil(total / limit);
    return {
      data,
      meta: {
        total,
        page,
        lastPage,
      },
    };
  }
}
