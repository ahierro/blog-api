import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { PostModule } from './post/post.module';
import { MorganMiddleware } from '@nest-middlewares/morgan';

@Module({
  imports: [ConfigModule.forRoot(),MongooseModule.forRoot(process.env.MONGO_URL), UserModule, AuthModule, BcryptModule, AdminModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    MorganMiddleware.configure('[:date[clf]] :method :url :status :response-time ms')
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}
