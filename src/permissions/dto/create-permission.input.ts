import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreatePermissionInput {
  @IsString()
  @Field()
  scope: string;

  @IsString()
  @Field()
  description: string;
}
