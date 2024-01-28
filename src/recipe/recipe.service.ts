import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Equal, In, Repository } from 'typeorm';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async create({ similar, ...rest }: CreateRecipeInput): Promise<Recipe> {
    try {
      const alreadyUsed = await this.recipeRepository.findOne({
        where: [{ title: Equal(rest.title) }, { name: Equal(rest.name) }],
      });

      if (alreadyUsed) {
        throw new BadRequestException('title or name is already in used!');
      }

      const relatedRecipes = await this.recipeRepository.find({
        where: {
          id: In(similar),
        },
        relations: ['similar'],
      });

      const recipe = this.recipeRepository.create({
        ...rest,
        similar: relatedRecipes,
      });
      await this.recipeRepository.save(recipe);

      return recipe;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return this.recipeRepository.find({ relations: ['similar'] });
  }

  findOne(id: string) {
    return this.recipeRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, { similar, ...rest }: UpdateRecipeInput) {
    let recipeToUpdate = await this.recipeRepository.findOne({
      where: { id },
      relations: ['similar'],
    });

    const similarRecipe = await this.recipeRepository.find({
      where: {
        id: In(similar),
      },
    });

    recipeToUpdate = Object.assign(recipeToUpdate, rest);
    recipeToUpdate.similar = similarRecipe;

    await this.recipeRepository.save(recipeToUpdate);

    return this.recipeRepository.findOne({
      where: { id },
      relations: ['similar'],
    });
  }

  async remove(id: string) {
    const recipeToDelete = await this.recipeRepository.findOneBy({ id });

    if (!recipeToDelete) {
      throw new BadRequestException('no recipe with the given id');
    }

    await this.recipeRepository.delete({ id });

    return recipeToDelete;
  }
}
