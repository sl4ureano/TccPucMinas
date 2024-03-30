import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class AuthRegisterLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(lowerCaseTransformer)
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @MinLength(8)
  @IsOptional()
  socialId: string;

  @ApiProperty({ example: 'test@live.com' })
  @IsOptional()
  emailParent: string | null;
}
