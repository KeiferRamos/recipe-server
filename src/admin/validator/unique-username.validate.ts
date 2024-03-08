import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidatorConstraint,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ name: 'uniqueUsername', async: true })
@Injectable()
export class IsUniqueUsernameConstraints {
  constructor(private readonly dataSource: DataSource) {}

  async validate(username: string) {
    const admin = await this.dataSource
      .getRepository('admin')
      .findOne({ where: { username } });

    return !admin;
  }
}

export function IsUniqueUsername(validationOptions?: ValidationOptions) {
  return (object, propertyName) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [],
      validator: IsUniqueUsernameConstraints,
      options: validationOptions,
    });
  };
}
