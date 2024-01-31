import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from './../auth.service';
import { UserService } from "../../user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService,
        private readonly userService: UserService) {
        //passwordField default 'password'
        //usernameField default 'username'
        super({ usernameField: 'username', passwordField: 'password' });
    }

    async validate(username: string, password: string) {
        const user = this.authService.validateUser(await this.userService.findByUserName(username), password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}