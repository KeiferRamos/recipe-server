import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
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

  @Field()
  @IsNumber()
  order: number;

  @IsString()
  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  id?: string;
}

@InputType()
export class CreateBlogInput {
  @IsString()
  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  id?: string;

  @Field()
  @IsString()
  @MaxLength(60)
  title: string;

  @Field()
  @IsString()
  banner_image: string;

  @Field()
  @IsBoolean()
  trending: boolean;

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
