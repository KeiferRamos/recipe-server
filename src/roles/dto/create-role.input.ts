import { InputType, Int, Field } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}
