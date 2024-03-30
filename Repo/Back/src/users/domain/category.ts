import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { FileDto } from "src/files/dto/file.dto";
import { FileEntity } from "src/files/infrastructure/persistence/relational/entities/file.entity";

export class Category {
  @ApiProperty({ example: 1 })
  @IsOptional()
  id: number | string;
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  nome: string;
  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  img?: FileEntity | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
