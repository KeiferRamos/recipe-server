import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { AccessTokenReturn } from './dto/access.token';
import { loginAdminInput } from './dto/login-admin.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Permission, Public } from 'src/decorator/metadata';
import { UserRoleInput } from './dto/update-user-role.input';
import { Permissions } from 'src/enums';

@UseGuards(JwtAuthGuard)
@Resolver(() => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Mutation(() => Admin)
  createAdmin(@Args('createAdminInput') createAdminInput: CreateAdminInput) {
    return this.adminService.create(createAdminInput);
  }

  @Public()
  @Query(() => [Admin], { name: 'admins' })
  findAll() {
    return this.adminService.findAll();
  }

  @Query(() => Admin, { name: 'admin' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.adminService.findOne(id);
  }

  @Public()
  @Mutation(() => AccessTokenReturn)
  login(@Args('loginAdminInput') loginAdminInput: loginAdminInput) {
    return this.adminService.login(loginAdminInput);
  }

  @Permission(Permissions.UPDATE_USER_ROLE)
  @Mutation(() => Admin)
  updateUserRole(@Args('userRoleInput') userRoleInput: UserRoleInput) {
    return this.adminService.updateUserRole(userRoleInput);
  }

  @Mutation(() => Admin)
  updateAdmin(
    @Args('updateAdminInput') updateAdminInput: UpdateAdminInput,
    @Context() context,
  ) {
    return this.adminService.update(updateAdminInput, context.req.user);
  }

  @Permission(Permissions.REMOVE_USER)
  @Mutation(() => String)
  removeAdmin(@Args('id', { type: () => String }) id: string) {
    return this.adminService.remove(id);
  }
}
