import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogGateway } from './blog.gateway';
import { BlogController } from './blog.controller';

@Module({
  providers: [BlogGateway, BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
