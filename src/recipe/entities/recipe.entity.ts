import { ObjectType, Field } from '@nestjs/graphql';
import { TimeType } from 'src/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CookingTime } from './cooking-time.entity';
import { Image } from './images.entity';

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

  @OneToOne(() => Image, (image) => image.recipe, {
    cascade: true,
    eager: true,
  })
  @Field(() => Image, { nullable: true })
  image: Image;

  @OneToOne(() => CookingTime, (cookingtime) => cookingtime.recipe, {
    cascade: true,
    eager: true,
  })
  @Field(() => CookingTime)
  cooking_time: CookingTime;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  category: string;

  @Column('text', { array: true })
  @Field(() => [String])
  tags: string[];

  @Column({ nullable: true })
  @Field({ nullable: true, defaultValue: false })
  is_popular: boolean;

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
