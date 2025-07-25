import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { BlogModule } from './blog/blog.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, BlogModule, AuthModule, PrismaModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
