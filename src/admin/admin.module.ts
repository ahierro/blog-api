import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [UserModule,PostModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
