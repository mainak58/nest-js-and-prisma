import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogGateway } from './blog.gateway';

@Module({
  providers: [BlogGateway, BlogService],
})
export class BlogModule {}
