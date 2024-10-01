import { IsArray, IsNotEmpty, isNotEmpty, IsObject, IsOptional, IsString, isString, Length, MaxLength } from "class-validator";
import { ObjectId } from "mongoose";
import { CreateCategoryDto } from "src/categories/dto/category.dto";
import { Category } from "src/categories/schemas/categories.schema";
import { CreateUserDto, UserResponseDto } from "src/users/dto/UserDto";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(130)
  description: string;

  @IsObject() 
  @IsNotEmpty()
  categories: CreateCategoryDto;
}

