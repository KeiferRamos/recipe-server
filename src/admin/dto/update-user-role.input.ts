import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UserRoleInput {
  @Field()
  @IsString()
  id: string;

  @Field()
  @IsString()
  role_name: string;
}
