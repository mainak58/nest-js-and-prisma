import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class BlogGateway {
  constructor(
    private blogService: BlogService,
    private readonly jwtService: JwtService,
  ) {}

  handleConnection(client: Socket) {
    const token =
      client.handshake.auth?.token ||
      client.handshake.headers?.authorization?.split(' ')[1];
    if (!token) {
      client.disconnect();
      return;
    }

    try {
      const payload = this.jwtService.verify(token);
      const userId = payload.sub;
      client.data.userId = userId;
    } catch (error) {
      client.disconnect();
    }
  }

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
