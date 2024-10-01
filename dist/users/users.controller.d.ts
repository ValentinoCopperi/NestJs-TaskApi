import { UsersService } from './users.service';
import { CreateUserDto } from './dto/UserDto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<CreateUserDto[]>;
    getUserById(id: string): Promise<CreateUserDto>;
    createNewUser(createUserDto: CreateUserDto): Promise<CreateUserDto>;
    updateBy(body: {
        biography: string;
    }, req: any): Promise<any>;
    updateUserData(body: {
        username: string;
    }, id: any): Promise<CreateUserDto>;
}
