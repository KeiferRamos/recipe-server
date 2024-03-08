import { ObjectType, Field } from '@nestjs/graphql';
import { TimeType } from 'src/enums';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
@ObjectType()
export class CookingTime {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  count: number;

  @Column()
  @Field()
  type: TimeType;

  @OneToOne(() => Recipe, (recipe) => recipe.cooking_time, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  recipe: Recipe;
}
