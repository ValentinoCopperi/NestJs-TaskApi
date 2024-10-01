import { User } from './schemas/users.schemas';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/UserDto';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    getAllUsers(): Promise<CreateUserDto[]>;
    getUserById(id: string): Promise<CreateUserDto>;
    createUser(createUserDto: CreateUserDto): Promise<CreateUserDto>;
    udpateUserData(id: any, newUsername: string): Promise<any>;
    updateBio(id: string, bio: string): Promise<any>;
}
