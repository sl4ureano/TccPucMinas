import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { Category } from "./category";
import { Type } from 'class-transformer';
import { FileDto } from 'src/files/dto/file.dto';
import { FileEntity } from 'src/files/infrastructure/persistence/relational/entities/file.entity';

export class Product {
  id: number | string;

  @ApiProperty({ description: 'Nome do produto' })
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Preço do produto' })
  @IsNumber()
  preco: number;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  imagem?: FileEntity | null;

  @ApiPropertyOptional({ type: () => Category })
  @IsOptional()
  categoria: Category | null;

  @ApiProperty({ description: 'Indicador de carga do produto' })
  isLoading: boolean;


  constructor() {
  }
}
