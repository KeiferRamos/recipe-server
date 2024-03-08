import { InputType, Field } from '@nestjs/graphql';
import {
  IsAlpha,
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  Validate,
} from 'class-validator';
import { IsAdminpass, IsMatch, IsStrongPassword } from 'src/utils';
import { AdminService } from '../admin.service';
import { IsUniqueUsername } from '../validator/unique-username.validate';

@InputType()
export class CreateAddressInput {
  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  id?: string;

  @Field()
  @IsNumberString()
  block: string;

  @Field()
  @IsString()
  street: string;

  @Field()
  @IsString()
  barangay: string;

  @Field()
  @IsString()
  city: string;

  @Field()
  @IsString()
  province: string;

  @Field()
  @IsNumberString()
  zip_code: string;
}

@InputType()
export class CreateAdminInput {
  @Field({ nullable: true })
  @IsAlpha()
  @IsOptional()
  first_name?: string;

  @Field({ nullable: true })
  @IsAlpha()
  @IsOptional()
  middle_name?: string;

  @Field({ nullable: true })
  @IsAlpha()
  @IsOptional()
  last_name?: string;

  @Field(() => String)
  @MinLength(8)
  @IsString()
  username: string;

  @Field(() => String)
  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  password: string;

  @Field(() => String)
  @IsMatch('password')
  verify: string;

  @Field()
  @IsString()
  @IsAdminpass(process.env.ADMIN_PASS)
  admin_pass: string;

  @Field(() => String, { nullable: true })
  @IsNumberString()
  @IsOptional()
  contact_no?: string;

  @Field(() => CreateAddressInput, { nullable: true })
  @IsOptional()
  address?: CreateAddressInput;

  @Field(() => String, { nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;
}
