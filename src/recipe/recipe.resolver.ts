import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RecipeService } from './recipe.service';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeInput } from './dto/create-recipe.input';
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
    return this.recipeService.createOrUpdate(createRecipeInput);
  }

  @Public()
  @Query(() => [Recipe])
  Similar(@Args('id') id: string) {
    return this.recipeService.findSimilar(id);
  }

  @Public()
  @Query(() => [Recipe], { name: 'recipes' })
  findAll() {
    return this.recipeService.findAll();
  }

  @Public()
  @Query(() => Recipe, { name: 'recipe' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.recipeService.findOne(id);
  }

  @Permission(Permissions.REMOVE_RECIPE)
  @Mutation(() => Recipe)
  removeRecipe(@Args('id', { type: () => String }) id: string) {
    return this.recipeService.remove(id);
  }
}
