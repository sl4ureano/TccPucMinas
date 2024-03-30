import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from "../infrastructure/persistence/relational/entities/transaction.entity";
import { Product } from "./product";
import { User } from "./user";
import { IsNotEmpty, IsOptional } from 'class-validator';

export class Transaction {
  id: number;

  @ApiProperty({ type: () => User })
  @IsNotEmpty()
  user: User;

  @ApiProperty({ type: () => Product, isArray: true })
  @IsOptional()
  products: Product[] | null;

  @ApiProperty()
  @IsNotEmpty()
  total: number;

  @ApiProperty({ enum: TransactionType, enumName: 'TransactionType' })
  @IsNotEmpty()
  type: TransactionType;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
