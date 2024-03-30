import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Category } from 'src/users/domain/category';
import { FileEntity } from 'src/files/infrastructure/persistence/relational/entities/file.entity';

@Entity({
  name: 'category',
})
export class CategoryEntity extends EntityRelationalHelper implements Category {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nome: string;

    @ManyToOne(() => FileEntity, {
      eager: true,
    })
    img?: FileEntity | null;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  }
