import { CreateCategoryDto } from "src/categories/dto/category.dto";
export declare class CreateTaskDto {
    title: string;
    description: string;
    categories: CreateCategoryDto;
}
