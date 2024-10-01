import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/categories.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {


    constructor(
        @InjectModel(Category.name) private readonly categoryModel : Model<Category>
    ){}

    public async getAllCategories() :  Promise<CreateCategoryDto[]>{
        return await this.categoryModel.find().exec();
    }

    public async getById(id) : Promise<CreateCategoryDto> {
        return await this.categoryModel.findById(id);
    }

    public async createNewCategory(createCategoryDto : CreateCategoryDto) : Promise<CreateCategoryDto> {
        const existsCategory = await this.categoryModel.findOne({name : createCategoryDto.name}).exec();

        if(existsCategory){
            throw new ConflictException(`Category ${createCategoryDto.name} already exists`);
        };

        const newCategory = new this.categoryModel(createCategoryDto);
        return await newCategory.save();
    } 

}
