import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories()
  {
    return this.categoriesService.getAllCategories();
  }
  
  @Get(':id')
  getCategoryById(
    @Param("id") id : string
  ){
    return this.categoriesService.getById(id);
  } 

  @Post()
  async createNewCategory(
    @Body() createCategoryDto : CreateCategoryDto  
  ){
    return this.categoriesService.createNewCategory(createCategoryDto);
  }

}
