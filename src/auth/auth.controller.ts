import { Body, Controller, Get, Inject, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/UserDto';
import { LoginUserDto } from './dto/UserAuthDto';
import { LocalAuthGuard } from 'src/guards/local.auth.guard';
import { Response as Res } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService 
  ) { }


  @UseGuards(LocalAuthGuard)
  @Post("login")
  async authLogin(@Request() req: any, @Response({ passthrough: true }) res: Res) {

    const token = await this.authService.login(req.user);

    res.cookie('TOKENUSER', token.access_token, {
      httpOnly: false,
      secure: false, // Siempre usa HTTPS
      sameSite: 'none', // Cambia a 'lax' si 'strict' causa problemas
      maxAge: 3600000, // 1 hora
    });

    return { message: "Login successful" , token : token.access_token , username : req.user.username}

  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Request() req: any, @Response({ passthrough: true }) res: Res)
  {
    res.cookie('TOKENUSER', '', {
      httpOnly: false,
      secure: false, // Siempre usa HTTPS
      sameSite: 'lax', // Cambia a 'lax' si 'strict' causa problemas
      maxAge: 0, // 1 hora
      path: '/',
    });
    res.status(200).json({ message: 'Logout successful' });

  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Request() req) {
    return await this.userService.getUserById(req.user._id);
  }

}
