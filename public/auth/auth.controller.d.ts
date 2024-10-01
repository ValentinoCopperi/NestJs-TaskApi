import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/UserDto';
import { Response as Res } from 'express';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    private readonly userService;
    constructor(authService: AuthService, configService: ConfigService, userService: UsersService);
    authLogin(req: any, res: Res): Promise<{
        message: string;
        token: string;
        username: any;
    }>;
    logout(req: any, res: Res): Promise<void>;
    getProfile(req: any): Promise<CreateUserDto>;
}
