import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async register(dto: AuthDto) {
    const oldUser = await this.userService.getByEmail(dto.email);

    if (oldUser) throw new BadRequestException('User already exists');

    const { password, ...user } = await this.userService.create(dto);
    const { accessToken } = this.issueToken(user.id);
    return {
      user,
      accessToken,
    };
  }

  async login(dto: AuthDto) {
    const { password, ...user } = await this.validateUser(dto);
    const { accessToken } = this.issueToken(user.id);
    return {
      user,
      accessToken,
    };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user.dataValues;
  }

  private issueToken(userId: number) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '2h',
    });

    return { accessToken };
  }
}
