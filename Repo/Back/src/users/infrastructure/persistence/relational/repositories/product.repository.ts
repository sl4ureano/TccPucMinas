import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { ProductEntity } from '../entities/product.entity';
import { Product } from 'src/users/domain/product';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class ProductRelationalRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly usersRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) {}

  async create(data: Product): Promise<any> {
    
    const newProduct = new ProductEntity();
    newProduct.nome = data.nome;
    newProduct.preco = data.preco;
    newProduct.imagem = data.imagem;
    newProduct.isLoading = data.isLoading;

    if (data.categoria) {
      // Aqui você precisa carregar a instância correta de CategoryEntity
      const categoryEntity = await this.categoryRepository.findOne({
        where: {
          id: data?.categoria?.id
        } as FindOptionsWhere<CategoryEntity>,
      });

      if (categoryEntity) {
        newProduct.categoria = categoryEntity;
      }
    }
  
    return await this.usersRepository.save(newProduct);
  }

  async findOne(fields: EntityCondition<Product>): Promise<NullableType<Product>> {
    const entity = await this.usersRepository.findOne({
      where: fields as FindOptionsWhere<ProductEntity>,
    });

    return entity ? entity : null;
  }

  async findManyWithPagination(): Promise<Product[]> {
    const entities = await this.usersRepository.find();
    return entities;
  }

}
