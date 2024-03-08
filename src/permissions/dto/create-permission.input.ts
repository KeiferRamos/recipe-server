import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreatePermissionInput {
  @IsString()
  @Field()
  scope: string;

  @IsString()
  @Field()
  description: string;

  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  id?: string;
}
