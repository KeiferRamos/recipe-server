import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class PermissionInput {
  @IsUUID()
  @Field()
  id: string;

  @IsString()
  @Field()
  scope: string;

  @IsString()
  @Field()
  description: string;
}

@InputType()
export class CreateRoleInput {
  @IsUUID()
  @Field({ nullable: true })
  @IsOptional()
  id?: string;

  @Field()
  @IsString()
  name: string;

  @Field(() => [PermissionInput])
  @IsArray()
  permissions: PermissionInput[];

  @Field()
  @IsString()
  description: string;
}
