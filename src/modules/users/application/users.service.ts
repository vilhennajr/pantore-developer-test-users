import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import * as jwt from 'jsonwebtoken';
import { UserEntity, UserRole } from '../domain/user.entity';
import { UserRepository } from '../domain/users.repository';

export interface JwtPayload {
  userId: string;
}

@Injectable()
export class UsersService {
  private readonly JWT_SECRET = 'your-secret-key';

  constructor(private readonly userRepository: UserRepository) {}

  private async checkUserExistenceByEmail(
    email: string,
  ): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new ConflictException(`E-mail ${email} já está em uso.`);
    }
    return user;
  }

  private async checkUserExistenceById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    await this.checkUserExistenceByEmail(createUserDto.email);

    const savedUser = await this.userRepository.createUser(createUserDto);

    return plainToInstance(UserEntity, savedUser);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<UserEntity> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException(
        'Os parâmetros de página e limite devem ser maiores que zero.',
      );
    }

    const users = await this.userRepository.findAll(page, limit);
    return plainToInstance(UserEntity, users);
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.checkUserExistenceById(id);
    return plainToInstance(UserEntity, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.checkUserExistenceById(id);

    await this.userRepository.updateUser(id, updateUserDto);
    return this.findOne(id);
  }

  async filter(query: {
    id?: string;
    name?: string;
    email?: string;
    role?: UserRole;
  }): Promise<UserEntity[]> {
    const users = await this.userRepository.filter(query);
    return plainToInstance(UserEntity, users);
  }

  async generatePasswordResetToken(email: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(
        `Usuário com e-mail ${email} não encontrado.`,
      );
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, this.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

  async resetPassword(token: string, newPassword: string): Promise<UserEntity> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as JwtPayload;

      const userId: string = decoded.userId;

      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundException(`Usuário com ID ${userId} não encontrado.`);
      }

      await this.userRepository.updateUser(userId, { password: newPassword });

      return plainToInstance(UserEntity, user);
    } catch {
      throw new UnauthorizedException(
        'Token de redefinição de senha inválido ou expirado.',
      );
    }
  }
}
