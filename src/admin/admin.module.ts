import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Address } from './entities/address.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { IsUniqueUsernameConstraints } from './validator/unique-username.validate';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    TypeOrmModule.forFeature([Admin, Address]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    RolesModule,
  ],
  providers: [AdminResolver, AdminService, IsUniqueUsernameConstraints],
  exports: [AdminService, IsUniqueUsernameConstraints],
})
export class AdminModule {}
