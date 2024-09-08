import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { USER_REPOSITORY } from 'src/constants/names.constants';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async getById(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!user) throw new NotFoundException('User not found');
    const { password, ...rest } = user.dataValues;
    return rest;
  }

  async create(dto: AuthDto): Promise<User> {
    const user = {
      email: dto.email,
      fullName: dto.fullName,
      password: await hash(dto.password),
    };

    const { dataValues } = await this.userRepository.create<User>(user);

    return dataValues;
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}
