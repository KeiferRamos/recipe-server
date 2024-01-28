import { CreateAdminInput } from './create-admin.input';
import { InputType, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateAdminInput extends PartialType(
  OmitType(CreateAdminInput, ['verify']),
) {}
