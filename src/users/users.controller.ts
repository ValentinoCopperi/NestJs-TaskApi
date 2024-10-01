import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserResponseDto } from './dto/UserDto';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getAllUsers(): Promise<CreateUserDto[]> {
    return this.usersService.getAllUsers();
  }

  @Get(":id")
  getUserById(@Param("id") id: string): Promise<CreateUserDto> {
    return this.usersService.getUserById(id);
  }

  @Post()
  createNewUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('biography')
  updateBy(
    @Body() body: { biography: string },
    @Req() req: any
  ) {
    
    return this.usersService.updateBio(req.user._id , body.biography)
  }

  @Put(":id")
  updateUserData(
    @Body() body: { username: string },
    @Param("id") id: any
  ): Promise<CreateUserDto> {
    const { username } = body;
    return this.usersService.udpateUserData(id, username)
  }
}
