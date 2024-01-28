import { IsArray, IsString } from 'class-validator';
import { CreateBlogInput } from './create-blog.input';
import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class ContentInputWithIDType {
  @Field()
  @IsString()
  id: string;

  @Field()
  @IsString()
  type: string;

  @Field()
  @IsString()
  value: string;
}

@InputType()
export class UpdateBlogInput extends PartialType(
  OmitType(CreateBlogInput, ['content']),
) {
  @Field(() => String)
  @IsString()
  id: string;

  @Field(() => [ContentInputWithIDType])
  @IsArray()
  content: ContentInputWithIDType[];
}
