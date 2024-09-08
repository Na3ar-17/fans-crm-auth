import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @UsePipes(new ValidationPipe())
  @Auth()
  async getProfile(@CurrentUser('id') id: string) {
    return await this.userService.getById(id);
  }
}
