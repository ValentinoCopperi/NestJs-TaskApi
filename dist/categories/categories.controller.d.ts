import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(): Promise<CreateCategoryDto[]>;
    getCategoryById(id: string): Promise<CreateCategoryDto>;
    createNewCategory(createCategoryDto: CreateCategoryDto): Promise<CreateCategoryDto>;
}
