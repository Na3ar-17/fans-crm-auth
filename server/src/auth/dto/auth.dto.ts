import { IsEmail, IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  fullName?: string;
}
