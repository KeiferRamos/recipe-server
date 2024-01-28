import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from 'class-validator';

export function IsMatch(property: string) {
  return (object, propertyName) => {
    registerDecorator({
      propertyName,
      constraints: [property],
      target: object.constructor,
      options: {
        message: 'Password does not match',
      },
      validator: {
        validate(value, args) {
          return args.object[args.constraints[0]] === value;
        },
      },
    });
  };
}

export function IsAdminpass(property: string) {
  return (object, propertyName) => {
    registerDecorator({
      target: object.constructor,
      validator: {
        validate(value, args) {
          return [process.env.ADMIN_PASS, process.env.SUPER_ADMIN].includes(
            value,
          );
        },
      },
      options: {
        message: 'Invalid Admin Password',
      },
      constraints: [property],
      propertyName,
    });
  };
}

export function IsStrongPassword() {
  return (object, propertyName) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      validator: PasswordConstraints,
    });
  };
}

@ValidatorConstraint({ name: 'IsStrongPassword' })
export class PasswordConstraints implements ValidatorConstraintInterface {
  validate(value: string) {
    if (/\d/.test(value) && /[^a-zA-Z0-9]/.test(value) && /[A-Z]/.test(value)) {
      return true;
    }
    return false;
  }

  defaultMessage({ value }: ValidationArguments): string {
    const errors = [];
    if (!/\d/.test(value)) {
      errors.push('password must contains atleast 1 digit');
    }
    if (!/[^a-zA-Z0-9]/.test(value)) {
      errors.push('password must contains atleast 1 special character');
    }
    if (!/[A-Z]/.test(value)) {
      errors.push('password must contains atleast 1 uppercase character');
    }
    return errors.join(', ');
  }
}
