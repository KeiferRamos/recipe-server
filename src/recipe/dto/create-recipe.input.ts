import { InputType, Field } from '@nestjs/graphql';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateRecipeInput {
  @Field()
  @IsString()
  @MinLength(50)
  @MaxLength(60)
  title: string;

  @Field()
  @IsString()
  @MinLength(15)
  @MaxLength(25)
  name: string;

  @Field()
  @IsString()
  cooking_time: string;

  @Field(() => [String])
  @IsString({ each: true })
  @IsArray()
  tags: string[];

  @IsString()
  @Field()
  image: string;

  @Field()
  @IsString()
  @MinLength(300)
  @MaxLength(350)
  description: string;

  @Field(() => [String])
  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(1, { message: 'Ingredients must have atleast one content' })
  ingredients: string[];

  @Field(() => [String])
  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(1, { message: 'Instruction must have atleast one content' })
  instruction: string[];

  @Field()
  @IsBoolean()
  is_featured: boolean;

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  @IsArray()
  similar: string[];
}
