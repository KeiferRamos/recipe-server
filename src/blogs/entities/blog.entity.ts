import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Content } from './content.entity';

@ObjectType()
@Entity()
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  banner_image: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  trending: boolean;

  @Column()
  @Field()
  author: string;

  @OneToMany(() => Content, (content) => content.blog, { cascade: true })
  @Field(() => [Content])
  content: Content[];
}
