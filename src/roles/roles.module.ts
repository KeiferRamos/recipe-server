import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    PermissionsModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  providers: [RolesResolver, RolesService],
  exports: [RolesService],
})
export class RolesModule {}
