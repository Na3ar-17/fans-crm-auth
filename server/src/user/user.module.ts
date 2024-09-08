import { Module } from '@nestjs/common';
import { userProviders } from 'src/providers/user.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService, ...userProviders],
})
export class UserModule {}
