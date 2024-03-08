import { InputType, Field } from '@nestjs/graphql';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TimeType } from 'src/enums';
import { IsUnique } from '../validation/unique.name';

@InputType()
class CookingTimeInput {
  @IsEnum(TimeType)
  @Field()
  type: TimeType;

  @IsNumber()
  @Field()
  count: number;

  @IsUUID()
  @Field({ nullable: true })
  @IsOptional()
  id?: string;
}

@InputType()
class ImageInput {
  @IsString()
  @Field()
  square: string;

  @IsString()
  @Field()
  landscape: string;

  @IsUUID()
  @Field({ nullable: true })
  @IsOptional()
  id?: string;
}

@InputType()
export class CreateRecipeInput {
  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  id?: string;

  @Field()
  @IsString()
  @MinLength(50)
  @MaxLength(60)
  title: string;

  @Field()
  @IsString()
  category: string;

  @Field()
  @IsBoolean()
  is_popular: boolean;

  @Field()
  @IsUnique()
  @MinLength(20)
  @MaxLength(30)
  name: string;

  @Field(() => CookingTimeInput)
  @IsObject()
  cooking_time: CookingTimeInput;

  @Field(() => [String])
  @IsString({ each: true })
  @IsArray()
  tags: string[];

  @Field(() => ImageInput)
  @IsObject()
  image: ImageInput;

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
