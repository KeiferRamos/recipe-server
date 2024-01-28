import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { RecipeService } from './recipe.service';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Permission, Public } from 'src/decorator/metadata';
import { Permissions } from 'src/enums';

@UseGuards(JwtAuthGuard)
@Resolver(() => Recipe)
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Permission(Permissions.CREATE_RECIPE)
  @Mutation(() => Recipe)
  createRecipe(
    @Args('createRecipeInput') createRecipeInput: CreateRecipeInput,
  ) {
    return this.recipeService.create(createRecipeInput);
  }

  @Public()
  @Query(() => [Recipe], { name: 'AllRecipe' })
  findAll() {
    return this.recipeService.findAll();
  }

  @Public()
  @Query(() => Recipe, { name: 'Recipe' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.recipeService.findOne(id);
  }

  @Permission(Permissions.UPDATE_RECIPE)
  @Mutation(() => Recipe)
  updateRecipe(
    @Args('updateRecipeInput') updateRecipeInput: UpdateRecipeInput,
  ) {
    return this.recipeService.update(updateRecipeInput.id, updateRecipeInput);
  }

  @Permission(Permissions.REMOVE_RECIPE)
  @Mutation(() => Recipe)
  removeRecipe(@Args('id', { type: () => String }) id: string) {
    return this.recipeService.remove(id);
  }
}
