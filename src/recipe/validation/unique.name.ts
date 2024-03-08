import {
  ValidationArguments,
  ValidatorConstraint,
  registerDecorator,
} from 'class-validator';
import { DataSource, Equal, Not } from 'typeorm';
import { CreateRecipeInput } from '../dto/create-recipe.input';

@ValidatorConstraint({ name: 'IsUnique', async: true })
export class UniqueConstrains {
  constructor(private readonly dataSource: DataSource) {}

  async validate(name: string, args: ValidationArguments) {
    const condition = {
      name,
    };

    const { id }: any = args.object;

    if (id) {
      condition['id'] = Not(Equal(id));
    }

    const isUsed = await this.dataSource
      .getRepository('recipe')
      .findOne({ where: condition });

    return !isUsed;
  }
}

export function IsUnique() {
  return (object: any, propertyName) => {
    registerDecorator({
      propertyName,
      target: object.constructor,
      constraints: [],
      options: {
        message: 'Name Is Already Inused',
      },
      validator: UniqueConstrains,
    });
  };
}
