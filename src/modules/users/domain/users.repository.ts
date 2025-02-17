import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { PaginationService } from 'src/common/services/pagination.service';
import { UserEntity, UserRole } from './user.entity';

interface FilterQuery {
  id?: string;
  name?: string;
  email?: string;
  role?: UserRole;
}
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly paginationService: PaginationService,
  ) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    data: UserEntity[];
    meta: { total: number; page: number; lastPage: number };
  }> {
    if (page <= 0 || limit <= 0) {
      throw new BadRequestException(
        'Os parâmetros de página e limite devem ser maiores que zero.',
      );
    }

    const queryBuilder = this.repository.createQueryBuilder('user');
    const [data, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return this.paginationService.paginate(data, total, page, limit);
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await this.repository.findOne({ where: { email } });
    return user ?? undefined;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.repository.create(createUserDto);
    return this.repository.save(newUser);
  }

  async updateUser(
    id: string,
    updateData: Partial<UserEntity>,
  ): Promise<UserEntity> {
    const user = await this.findById(id);
    Object.assign(user, updateData);
    return this.repository.save(user);
  }

  async filter(query: FilterQuery): Promise<UserEntity[]> {
    const { id, name, email, role } = query;

    const filterConditions: Record<string, unknown> = {};

    if (id) filterConditions.id = id;
    if (name) filterConditions.name = Like(`%${name}%`);
    if (email) filterConditions.email = email;
    if (role) filterConditions.role = role;

    const users = await this.repository.find({ where: filterConditions });
    return users;
  }
}
