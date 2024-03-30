import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';

import { Transaction } from '../../../../domain/transaction';
import { ProductEntity } from 'src/users/infrastructure/persistence/relational/entities/product.entity';
import { UserEntity } from './user.entity';

export enum TransactionType {
  COMPRA = 'compra',
  TRANSFERENCIA = 'transferencia',
  EXTORNO = 'extorno',
  RECARGA = 'recarga',
}

@Entity({
  name: 'transaction',
})
export class TransactionEntity extends EntityRelationalHelper implements Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, {
    eager: true,
  }) 
  user: UserEntity; 

  @ManyToMany(() => ProductEntity, {
    eager: true,
  }) 
  @JoinTable() 
  products: ProductEntity[] | null; 

  @Column('decimal', { precision: 6, scale: 2 })
  total: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.COMPRA, // Defina um valor padrão, se necessário
  })
  type: TransactionType; // Coluna para armazenar o tipo de transação

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
