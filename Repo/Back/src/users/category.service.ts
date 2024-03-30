import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CategoryRelationalRepository } from "./infrastructure/persistence/relational/repositories/category.repository";
import { Category } from "./domain/category";
import { FilesService } from "src/files/files.service";

@Injectable()
export class CategoryService {
  constructor(
    private readonly genericRepository: CategoryRelationalRepository,
    private readonly filesService: FilesService
  ) {}

  async create(category: Category): Promise<any> {
    //todo verificar se imagem existe
    if (category.img?.id) {
      const fileObject = await this.filesService.findOne({
        id: category.img?.id,
      });
      if (!fileObject) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              img: 'imageNotExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    // todo verifica se categoria já existe
    if (category.nome) {
      const categoryObject = await this.genericRepository.findOne({
        nome: category.nome,
      });
      if (categoryObject) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              nome: 'categoryNameAlreadyExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
    return this.genericRepository.create(category);
  }


  async findAll(): Promise<any> {
    return this.genericRepository.findManyWithPagination();
  }

}
