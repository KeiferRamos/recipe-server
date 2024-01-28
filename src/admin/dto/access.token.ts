import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenReturn {
  @Field()
  access_token: string;
}
