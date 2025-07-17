import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [UserModule, PostModule, BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
