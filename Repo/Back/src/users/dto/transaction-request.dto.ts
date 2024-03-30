import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../infrastructure/persistence/relational/entities/transaction.entity';
import { IsNotEmpty } from 'class-validator';

export class ProductDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  amount: number;
}

export class TransactionRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ type: ProductDTO, isArray: true })
  @IsNotEmpty()
  products: ProductDTO[];

  @ApiProperty()
  @IsNotEmpty()
  total: number;

  @ApiProperty({ enum: TransactionType, enumName: 'TransactionType' })
  @IsNotEmpty()
  type: TransactionType;
}
