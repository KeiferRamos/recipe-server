import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Blog } from './blog.entity';

@ObjectType()
@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  value: string;

  @Column()
  @Field()
  order: number;

  @ManyToOne(() => Blog, (blog) => blog.content, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  blog: Blog;
}
