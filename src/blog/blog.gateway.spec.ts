import { Test, TestingModule } from '@nestjs/testing';
import { BlogGateway } from './blog.gateway';
import { BlogService } from './blog.service';

describe('BlogGateway', () => {
  let gateway: BlogGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogGateway, BlogService],
    }).compile();

    gateway = module.get<BlogGateway>(BlogGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
