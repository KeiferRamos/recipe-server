import { SetMetadata } from '@nestjs/common';
import { Permissions } from 'src/enums';

export const IS_PUBLIC_KEY = 'IS_PUBLIC_KEY';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const PERMISSIONS = 'permissions';
export const Permission = (...permission: Permissions[]) =>
  SetMetadata(PERMISSIONS, permission);
