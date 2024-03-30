import { Module } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UsersRelationalRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CategoryRelationalRepository } from './repositories/category.repository';
import { CategoryEntity } from './entities/category.entity';
import { ProductRelationalRepository } from './repositories/product.repository';
import { ProductEntity } from './entities/product.entity';
import { TransactionRelationalRepository } from './repositories/transaction.repository';
import { TransactionEntity } from './entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([CategoryEntity]),
    TypeOrmModule.forFeature([ProductEntity]),
    TypeOrmModule.forFeature([TransactionEntity])
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UsersRelationalRepository,
    },
    CategoryRelationalRepository,
    ProductRelationalRepository,
    TransactionRelationalRepository
  ],
  exports: [
    UserRepository,
    CategoryRelationalRepository,
    ProductRelationalRepository,
    TransactionRelationalRepository
  ],
})
export class RelationalUserPersistenceModule {}
