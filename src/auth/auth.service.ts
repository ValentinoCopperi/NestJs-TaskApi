import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/users.schemas';
import * as bcrypt from 'bcrypt';
import { JwtUserDto, LoginUserDto } from './dto/UserAuthDto';
@Injectable()
export class AuthService {


    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async validateUser ( email : string , password : string) : Promise<any> {
        const user = await this.userModel.findOne({email});

        if(!user) return null;

        const isPasswordValid = await bcrypt.compare(password , user.password);

        if(!isPasswordValid) return null;

        return {
            _id : user._id,
            email : user.email,
            username : user.username
        };
    }

    async login (user : JwtUserDto) {

        const payload = {
            _id : user._id,
            username : user.username,
        }

        return {
            access_token : this.jwtService.sign(payload)
        };

    }

}
