import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Permission } from 'src/decorator/metadata';
import { Permissions } from 'src/enums';

@UseGuards(JwtAuthGuard)
@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Permission(Permissions.CREATE_ROLE)
  @Mutation(() => Role)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.rolesService.create(createRoleInput);
  }

  @Query(() => [Role], { name: 'AllRole' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Query(() => Role, { name: 'Role' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.rolesService.findOne(id);
  }

  @Permission(Permissions.UPDATE_ROLE)
  @Mutation(() => Role)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.rolesService.update(updateRoleInput.id, updateRoleInput);
  }

  @Permission(Permissions.REMOVE_ROLE)
  @Mutation(() => Role)
  removeRole(@Args('id', { type: () => String }) id: string) {
    return this.rolesService.remove(id);
  }
}
