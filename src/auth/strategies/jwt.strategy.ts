import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy , ExtractJwt } from 'passport-jwt';
import { JwtUserDto } from "../dto/UserAuthDto";
import { Request } from "express";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    const token = req?.cookies['TOKENUSER'];
                    return token;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
        });
    }

    async validate(payload : JwtUserDto){
        if(!payload){
            throw new UnauthorizedException();
        }
        
        return {_id : payload._id , username : payload.username};
    }

}