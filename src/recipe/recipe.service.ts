import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Equal, In, Not, Repository } from 'typeorm';
import { ValidationError } from 'class-validator';
import { ValidationException } from 'src/decorator/metadata';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async createOrUpdate({
    similar,
    id,
    ...rest
  }: CreateRecipeInput): Promise<Recipe> {
    try {
      const relatedRecipes = await this.recipeRepository.find({
        where: {
          name: In(similar),
        },
        relations: {
          similar: true,
        },
      });

      return this.recipeRepository.save({
        id,
        similar: relatedRecipes,
        ...rest,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return this.recipeRepository.find({
      relations: {
        similar: true,
      },
    });
  }

  findOne(id: string) {
    return this.recipeRepository.findOne({
      where: { id },
      relations: {
        similar: true,
      },
    });
  }

  async findSimilar(id: string) {
    if (id) {
      return this.recipeRepository.find({
        where: { id: Not(Equal(id)) },
        relations: {
          similar: true,
        },
      });
    }
    return this.recipeRepository.find({
      relations: {
        similar: true,
      },
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
