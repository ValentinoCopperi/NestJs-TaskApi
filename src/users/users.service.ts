import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schemas';
import { model, Model } from 'mongoose';
import { CreateUserDto, UserResponseDto } from './dto/UserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
      
    ) { }

    public async getAllUsers(): Promise<CreateUserDto[]> {
        return this.userModel.find().lean();
    }

    public async getUserById(id: string): Promise<CreateUserDto> {
        const user = await this.userModel.findById(id).lean();
      
        if (!user) {
          throw new NotFoundException("User does not exist");
        }
        
        return user;
      }

    public async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {

        const userExists = await this.userModel.findOne({
            $or: [
                { username: createUserDto.username },
                { email: createUserDto.email },
            ]
        }).exec()

        if (userExists) {
            throw new ConflictException("User with this email or username already exists");
        };


        const hashPassword = await bcrypt.hash(createUserDto.password, 10);



        const newUser = new this.userModel({
            ...createUserDto,
            password: hashPassword
        });

       

        await newUser.save();

        const userWithoutPassword = newUser.toObject();
        delete userWithoutPassword.password;
        
        return userWithoutPassword;

    }

    public async udpateUserData(id: any, newUsername: string): Promise<any> {

        const user = await this.userModel.findById(id).lean();

        if (user) {
            throw new ConflictException(`User with ${newUsername} username already exists`);
        }

        const result = await this.userModel.updateOne(
            { _id: id },
            { $set: { username: newUsername } }
        ).exec();

        if (result.matchedCount === 0) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        if (result.modifiedCount === 0) {
            throw new ConflictException(`The username for user with id ${id} was not updated`);
        }

        // Puedes retornar el resultado si lo necesitas
        return result;

    }

    public async updateBio (id:string , bio : string) : Promise<any> {

        const user = await this.userModel.findById(id).lean();

        
        if (!user) {
            throw new ConflictException(`User with ${user.username} username not exists`);
        }

        const updatedUser = await this.userModel.findByIdAndUpdate(
            {_id : id},
            {$set : { description : bio }},
            {  new : true}
        ).exec();



    }

}
