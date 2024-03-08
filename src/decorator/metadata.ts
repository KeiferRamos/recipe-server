import { SetMetadata } from '@nestjs/common';
import { Permissions } from 'src/enums';
import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const IS_PUBLIC_KEY = 'IS_PUBLIC_KEY';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const PERMISSIONS = 'permissions';
export const Permission = (...permission: Permissions[]) =>
  SetMetadata(PERMISSIONS, permission);

export class ValidationException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super(errors.map((error) => Object.values(error.constraints)).flat());
  }
}
