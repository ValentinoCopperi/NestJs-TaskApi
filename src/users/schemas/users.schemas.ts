import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})
export class User {

    @Prop({
        type:String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:30,
    })
    username : string;
    @Prop({
        type:String,
        required:true,
        unique:true,
        match : [/^\S+@\S+\.\S+$/, 'Must provide a valid email']
    })
    email : string;
    
    @Prop({
        type: String,
        maxlength: 130,
        default: '',
        trim: true
      })
      description: string;

    @Prop({
        type: String,
        required:true,
        minlength:5,
        maxlength:230,
    })
    password : string;

}

export const UserSchema = SchemaFactory.createForClass(User);