import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { TransactionEntity, TransactionType } from '../entities/transaction.entity';
import { Transaction } from 'src/users/domain/transaction';
import { Product } from 'src/users/domain/product';
import { ProductEntity } from '../entities/product.entity';
import { UserMapper } from '../mappers/user.mapper';
import { CategoryEntity } from '../entities/category.entity';
import { Category } from 'src/users/domain/category';

@Injectable()
export class TransactionRelationalRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>
  ) {}

  async create(data: Transaction): Promise<any> {
    const productIds = data?.products?.map(product => product.id); // IDs dos produtos a serem inseridos
    const transaction= await this.insertTransaction(data.user.id,data.total,data.type);
    if(productIds){
      await this.insertTransactionProducts(transaction.id, productIds);
    }
    return transaction
  }


  async insertTransactionProducts(transactionId: number, productIds: any[]): Promise<void> {
    try {
      const insertData = productIds.map(productId => ({
        transactionId,
        productId,
      }));

      await this.transactionRepository.createQueryBuilder()
        .insert()
        .into('transaction_products_product')
        .values(insertData)
        .execute();

      //console.log('Inserção em massa concluída com sucesso.');
    } catch (error) {
      console.error('Erro ao inserir os produtos da transação:', error);
      throw error;
    }
  }

  async insertTransaction(_userId: number | string, _total: number, type: TransactionType): Promise<Transaction> {
    try {
        const query = `
            INSERT INTO public."transaction" ("createdAt", "updatedAt", "total", "userId", "type")
            VALUES (now(), now(), $1, $2, $3)
            RETURNING *
        `;
        const parameters = [_total, _userId, type];

        const result = await this.transactionRepository.query(query, parameters);

        const insertedTransaction: Transaction = result[0]; // Assuming Transaction is the type representing your transaction entity
        //console.log('Inserção concluída com sucesso:', insertedTransaction);
        return insertedTransaction;
    } catch (error) {
        console.error('Erro ao inserir a transação:', error);
        throw error;
    }
}

  

  async findOne(fields: EntityCondition<Transaction>): Promise<NullableType<Transaction>> {
    const entity = await this.transactionRepository.findOne({
      where: fields as FindOptionsWhere<TransactionEntity>,
    });

    return entity ? entity : null;
  }

  async findManyWithPaginationAll(): Promise<Transaction[]> {
    const entities = await this.transactionRepository.find();
    return entities;
  }

  async findManyWithPagination(): Promise<Transaction[]> {
    const entities = await this.transactionRepository.find({ where: { type: TransactionType.COMPRA } });
    return entities;
  }


  async countAll(): Promise<any> {
    const compras = await this.transactionRepository.count({ where: { type: TransactionType.COMPRA } });
    const recargasCount = await this.transactionRepository.count({ where: { type: TransactionType.RECARGA } });

    const vendas = await this.transactionRepository.createQueryBuilder('transaction')
        .select('SUM(transaction.total)', 'totalVendas')
        .where('transaction.type = :type', { type: TransactionType.COMPRA })
        .getRawOne();

  const recargas = await this.transactionRepository.createQueryBuilder('transaction')
        .select('SUM(transaction.total)', 'totalRecargas')
        .where('transaction.type = :type', { type: TransactionType.RECARGA })
        .getRawOne();

        const extornos = await this.transactionRepository.createQueryBuilder('transaction')
        .select('SUM(transaction.total)', 'totalRecargas')
        .where('transaction.type = :type', { type: TransactionType.EXTORNO })
        .getRawOne();

        const transferencias = await this.transactionRepository.createQueryBuilder('transaction')
        .select('SUM(transaction.total)', 'totalRecargas')
        .where('transaction.type = :type', { type: TransactionType.TRANSFERENCIA })
        .getRawOne();

        

        const alunos = await this.getTotalUsersWithRoleIdFour([4])

        const responsaveis = await this.getTotalUsersWithRoleIdFour([2])

        const alunosMaisCompram = await this.getclientesMaisCompram()

    
    return { compras, totalVendas: vendas.totalVendas, recargas: recargasCount, totalRecargas: recargas.totalRecargas, alunos:alunos,alunosMaisCompram:alunosMaisCompram,extornos:extornos.totalRecargas,transferencias:transferencias.totalRecargas,responsaveis:responsaveis };
  }

    async getTotalUsersWithRoleIdFour(parameters): Promise<number> {
      const query = `
          SELECT COUNT(*) AS "totalUsers"
          FROM "user"
          WHERE "roleId" = $1
      `;
      const result = await this.transactionRepository.query(query, parameters);
      return result[0].totalUsers;
  }

  async getclientesMaisCompram(): Promise<number> {
        const query = `
        SELECT u."firstName" || ' ' || u."lastName" AS "userName", SUM(t.total) AS "totalGasto"
        FROM public."transaction" t
        INNER JOIN public."user" u ON t."userId" = u.id
        WHERE t."type" = '${TransactionType.COMPRA}'
        GROUP BY u."firstName", u."lastName"
        ORDER BY SUM(t.total) DESC
        LIMIT 5
    `;

    const result = await this.transactionRepository.query(query);
    return result;
}

  toEntity(transaction: Transaction): TransactionEntity {
    const transactionEntity = new TransactionEntity();
    transactionEntity.user = UserMapper.toPersistence(transaction.user);
    transactionEntity.products = this.convertProductsFromEntities(transaction.products);
    transactionEntity.total = transaction.total;
    transactionEntity.type = transaction.type;
    return transactionEntity;
  }

  fromEntity(transactionEntity: TransactionEntity): Transaction {
    const transaction = new Transaction();
    transaction.id = transactionEntity.id;
    transaction.user = transactionEntity.user;
    transaction.products = transactionEntity.products;
    transaction.total = transactionEntity.total;
    transaction.type = transactionEntity.type;
    transaction.createdAt = transactionEntity.createdAt;
    transaction.updatedAt = transactionEntity.updatedAt;
    transaction.deletedAt = transactionEntity.deletedAt;
    return transaction;
  }


  convertProductsFromEntities(products: Product[] | null): ProductEntity[] {
    if (!products) {
      return []; // Retorna uma lista vazia se a lista de Product for nula
    }

    const productEntities: ProductEntity[] = products.map(product => {
      const productEntity = new ProductEntity();
      productEntity.id = Number(product.id);
      productEntity.nome = product.nome;
      productEntity.preco = product.preco;
      productEntity.imagem = product.imagem;
      productEntity.categoria = this.convertCategory(product.categoria);
      productEntity.isLoading = product.isLoading;
      return productEntity;
    });

    return productEntities;
  }

  convertCategory(category: Category | null): CategoryEntity {
    const categoryEntity = new CategoryEntity();
    // Aqui você precisa definir como mapear as propriedades da Category para a CategoryEntity
    return categoryEntity;
  }

}



