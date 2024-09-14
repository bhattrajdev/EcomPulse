import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {  currentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';
import { promises } from 'dns';
import { CategoryEntity } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthorizeGuard(Roles.ADMIN),AuthGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto,@currentUser() currentUser:UserEntity):Promise<CategoryEntity> {
    return  this.categoriesService.create(createCategoryDto,currentUser);
  }

  @Get()
 async findAll() {
    return await this.categoriesService.findAll();
  }

  @UseGuards(AuthorizeGuard(Roles.ADMIN),AuthGuard)
  @Get(':id')
   async findOne(@Param('id') id: string) {
    return await this.categoriesService.findOne(+id);
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string):Promise<{message:string}> {
    return await this.categoriesService.remove(+id);
  }
}
