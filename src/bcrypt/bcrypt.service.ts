import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {

    constructor(private configService: ConfigService) {}

    async encryptPassword(password: string): Promise<string> {
        const saltRounds: number = +this.configService.get<number>('BCRYPT_SALT_ROUNDS');
        return await bcrypt.hash(password, saltRounds);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

}
