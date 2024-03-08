import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
  ) {}

  async createOrUpdate(inputs: CreateBlogInput): Promise<Blog> {
    try {
      return this.blogRepository.save(inputs);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return this.blogRepository.find({ relations: ['content'] });
  }

  findOne(id: string) {
    try {
      return this.blogRepository.findOne({
        where: { id },
        relations: ['content'],
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    try {
      const blog = await this.blogRepository.findOneBy({ id });

      if (!blog) {
        throw new BadRequestException(`blog with id ${id} is not existing`);
      }
      await this.blogRepository.delete({ id });
      return blog;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteAll() {
    await this.blogRepository.delete({});
    return 'hello world';
  }
}
