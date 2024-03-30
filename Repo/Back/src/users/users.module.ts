import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { FilesModule } from 'src/files/files.module';
import databaseConfig from 'src/database/config/database.config';
import { DatabaseConfig } from 'src/database/config/database-config.type';
import { UsersService } from './users.service';
import { DocumentUserPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { RelationalUserPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { MailModule } from 'src/mail/mail.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? DocumentUserPersistenceModule
  : RelationalUserPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, FilesModule,MailModule],
  controllers: [UsersController,CategoryController,ProductController,TransactionController],
  providers: [UsersService,CategoryService,ProductService,TransactionService],
  exports: [UsersService, infrastructurePersistenceModule],
})
export class UsersModule {}
