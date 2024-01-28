import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ContentType } from 'src/enums';

@InputType()
export class ContentInputType {
  @Field()
  @IsString()
  @IsEnum(ContentType, { message: 'Invalid Type' })
  type: ContentType;

  @Field()
  @IsString()
  value: string;
}

@InputType()
export class CreateBlogInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  banner_image: string;

  @Field()
  @IsString()
  author: string;

  @Field(() => [ContentInputType])
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ContentInputType)
  content: ContentInputType[];
}
