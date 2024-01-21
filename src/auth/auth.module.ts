import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserModule } from 'src/user/user.module';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [PassportModule, JwtModule.register({
    secret: "S3Cr3t",
    signOptions: {
      expiresIn: '24h'
    }
  }), forwardRef(() => UserModule), BcryptModule],
  controllers: [],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule { }
