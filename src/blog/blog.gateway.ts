import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@WebSocketGateway()
export class BlogGateway {
  constructor(private readonly blogService: BlogService) {}

  @SubscribeMessage('createBlog')
  create(@MessageBody() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @SubscribeMessage('findAllBlog')
  findAll() {
    return this.blogService.findAll();
  }

  @SubscribeMessage('findOneBlog')
  findOne(@MessageBody() id: number) {
    return this.blogService.findOne(id);
  }

  @SubscribeMessage('updateBlog')
  update(@MessageBody() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(updateBlogDto.id, updateBlogDto);
  }

  @SubscribeMessage('removeBlog')
  remove(@MessageBody() id: number) {
    return this.blogService.remove(id);
  }
}
