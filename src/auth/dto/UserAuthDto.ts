import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    
   

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}

export class JwtUserDto {
    @IsNotEmpty()
    _id : string;


    @IsNotEmpty()
    username : string;
}
