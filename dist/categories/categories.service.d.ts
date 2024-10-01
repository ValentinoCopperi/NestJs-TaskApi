import { Category } from './schemas/categories.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/category.dto';
export declare class CategoriesService {
    private readonly categoryModel;
    constructor(categoryModel: Model<Category>);
    getAllCategories(): Promise<CreateCategoryDto[]>;
    getById(id: any): Promise<CreateCategoryDto>;
    createNewCategory(createCategoryDto: CreateCategoryDto): Promise<CreateCategoryDto>;
}
