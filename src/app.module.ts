import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './bcrypt/bcrypt.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/blog"), UserModule, AuthModule, BcryptModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
