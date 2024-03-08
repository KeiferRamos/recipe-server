import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BlogsService } from './blogs.service';
import { Blog } from './entities/blog.entity';
import { CreateBlogInput } from './dto/create-blog.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Permission, Public } from 'src/decorator/metadata';
import { Permissions } from 'src/enums';

@UseGuards(JwtAuthGuard)
@Resolver(() => Blog)
export class BlogsResolver {
  constructor(private readonly blogsService: BlogsService) {}

  @Permission(Permissions.CREATE_BLOG)
  @Mutation(() => Blog)
  createBlog(@Args('createBlogInput') createBlogInput: CreateBlogInput) {
    return this.blogsService.createOrUpdate(createBlogInput);
  }

  @Public()
  @Query(() => [Blog], { name: 'blogs' })
  findAll() {
    return this.blogsService.findAll();
  }

  @Public()
  @Query(() => Blog, { name: 'blog' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.blogsService.findOne(id);
  }

  @Permission(Permissions.REMOVE_BLOG)
  @Mutation(() => Blog)
  removeBlog(@Args('id', { type: () => String }) id: string) {
    return this.blogsService.remove(id);
  }
}
