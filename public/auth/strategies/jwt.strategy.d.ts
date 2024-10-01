import { ConfigService } from "@nestjs/config";
import { JwtUserDto } from "../dto/UserAuthDto";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: JwtUserDto): Promise<{
        _id: string;
        username: string;
    }>;
}
export {};
