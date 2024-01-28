import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { Content } from './entities/content.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  async create({ content, ...rest }: CreateBlogInput): Promise<Blog> {
    try {
      const createdBlog = this.blogRepository.create(rest);
      const blog = await this.blogRepository.save(createdBlog);

      const contents = content.map((con) =>
        this.contentRepository.create({ ...con, blog }),
      );

      await this.contentRepository.save(contents);

      return this.blogRepository.findOne({
        where: { title: rest.title },
        relations: ['content'],
      });
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

  async update(id: string, { content, ...rest }: UpdateBlogInput) {
    try {
      await this.blogRepository.update({ id }, { ...rest });

      if (content) {
        const updatedContent = content.map((cont) =>
          this.contentRepository.create(cont),
        );

        await this.contentRepository.save(updatedContent);
      }

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
