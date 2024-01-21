import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { IUser } from './types/IUser';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
        private readonly bcryptService: BcryptService) {
    }

    login(user: IUser) {
        const payload = {
            username: user.username,
            sub: user._id,
            admin: user.isAdmin
        }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async validateUser(user:IUser,password:string): Promise<IUser> {
        console.log("validateUser",user,password);
        if (user) {
            const isValidPass = await this.bcryptService.comparePassword(password, user.password);
            if (!isValidPass) {
                console.log("Invalid Password");
                return null;
            }
            return user;
        } else {
            console.log("User Not Found");
            return null;
        }
    }

}

