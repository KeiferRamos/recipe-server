import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { RecipeModule } from './recipe/recipe.module';
import { BlogsModule } from './blogs/blogs.module';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity';
import { Address } from './admin/entities/address.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      database: 'Recipe',
      type: 'postgres',
      username: 'postgres',
      password: 'postgres',
      host: 'localhost',
      synchronize: true,
      autoLoadEntities: true,
      entities: [Admin, Address],
      port: 5432,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    RecipeModule,
    BlogsModule,
    AdminModule,
    AuthModule,
    PermissionsModule,
    RolesModule,
  ],
})
export class AppModule {}
