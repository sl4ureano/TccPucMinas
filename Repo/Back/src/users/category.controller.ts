import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { NullableType } from '../utils/types/nullable.type';
import { QueryUserDto } from './dto/query-user.dto';
import { User } from './domain/user';
import { CategoryService } from './category.service';
import { Category } from './domain/category';


@ApiTags('Category')
@Controller({
  path: 'category',
  version: '1',
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}


  // @ApiBearerAuth()
  // @Roles(RoleEnum.admin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() category: Category): Promise<Category> {
    return this.categoryService.create(category);
  }

//   @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @SerializeOptions({
//     groups: ['admin'],
//   })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

}









