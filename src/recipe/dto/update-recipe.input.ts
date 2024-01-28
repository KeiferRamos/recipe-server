import { CreateRecipeInput } from './create-recipe.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRecipeInput extends PartialType(CreateRecipeInput) {
  @Field()
  id: string;
}
