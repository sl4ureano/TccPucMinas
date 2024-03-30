import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Product } from 'src/users/domain/product';
import { CategoryEntity } from './category.entity';
import { FileEntity } from 'src/files/infrastructure/persistence/relational/entities/file.entity';

@Entity({
  name: 'product',
})
export class ProductEntity extends EntityRelationalHelper implements Product {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nome: string;
  
    @Column('decimal', { precision: 6, scale: 2 })
    preco: number;
  
    @ManyToOne(() => FileEntity, {
      eager: true,
    })
    imagem?: FileEntity | null;
  
    @ManyToOne(() => CategoryEntity, {
      eager: true,
    })
    categoria: CategoryEntity; // Associa a entidade CategoryEntity
  
    @Column({ default: false })
    isLoading: boolean;
  }
