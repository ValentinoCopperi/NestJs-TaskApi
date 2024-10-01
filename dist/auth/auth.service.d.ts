import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/users.schemas';
import { JwtUserDto } from './dto/UserAuthDto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: JwtUserDto): Promise<{
        access_token: string;
    }>;
}
