import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { Permissions } from 'src/enums';
import { Permission as UserPermission } from 'src/decorator/metadata';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver(() => Permission)
export class PermissionsResolver {
  constructor(private readonly permissionsService: PermissionsService) {}

  @UserPermission(Permissions.CREATE_PERMISSION)
  @Mutation(() => Permission)
  createPermission(
    @Args('createPermissionInput') createPermissionInput: CreatePermissionInput,
  ) {
    return this.permissionsService.create(createPermissionInput);
  }

  @Query(() => [Permission], { name: 'AllPermission' })
  findAll() {
    return this.permissionsService.findAll();
  }

  @Query(() => Permission, { name: 'Permission' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.permissionsService.findOne(id);
  }

  @UserPermission(Permissions.UPDATE_PERMISSION)
  @Mutation(() => Permission)
  updatePermission(
    @Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput,
  ) {
    return this.permissionsService.update(
      updatePermissionInput.id,
      updatePermissionInput,
    );
  }

  @UserPermission(Permissions.REMOVE_PERMISSION)
  @Mutation(() => Permission)
  removePermission(@Args('id', { type: () => String }) id: string) {
    return this.permissionsService.remove(id);
  }
}
