import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthChildLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  socialId: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
