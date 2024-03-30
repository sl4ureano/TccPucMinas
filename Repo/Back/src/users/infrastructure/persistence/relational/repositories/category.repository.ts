import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Category } from 'src/users/domain/category';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class CategoryRelationalRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly usersRepository: Repository<CategoryEntity>,
  ) {}

  async create(data: Category): Promise<any> {
    const newData: DeepPartial<CategoryEntity> = {
      nome: data.nome,
      img: data.img,
    };
    return await this.usersRepository.save(newData);
  }

  async findOne(fields: EntityCondition<Category>): Promise<NullableType<Category>> {
    const entity = await this.usersRepository.findOne({
      where: fields as FindOptionsWhere<CategoryEntity>,
    });

    return entity ? entity : null;
  }

  async findManyWithPagination(): Promise<Category[]> {
    const entities = await this.usersRepository.find();
    return entities;
  }

}
