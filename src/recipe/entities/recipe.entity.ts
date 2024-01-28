import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  image: string;

  @Column()
  @Field()
  cooking_time: string;

  @Column('text', { array: true })
  @Field(() => [String])
  tags: string[];

  @Column()
  @Field()
  description: string;

  @Column('text', { array: true })
  @Field(() => [String])
  ingredients: string[];

  @Column('text', { array: true })
  @Field(() => [String])
  instruction: string[];

  @Column()
  @Field()
  is_featured: boolean;

  @ManyToMany(() => Recipe, (recipe) => recipe.similar)
  @Field(() => [Recipe])
  @JoinTable()
  similar: Recipe[];
}
