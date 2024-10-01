import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Category {
    @Prop({
        type:String,
        required:true,
        unique:true,
        maxlength:50
    })
    name : string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);