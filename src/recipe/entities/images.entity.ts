import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recipe } from './recipe.entity';

@ObjectType()
@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  square: string;

  @Column()
  @Field()
  landscape: string;

  @OneToOne(() => Recipe, (recipe) => recipe.image, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  recipe: Recipe;
}
