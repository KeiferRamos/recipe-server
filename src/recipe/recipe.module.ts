import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeResolver } from './recipe.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from 'src/admin/admin.module';
import { CookingTime } from './entities/cooking-time.entity';
import { Image } from './entities/images.entity';
import { UniqueConstrains } from './validation/unique.name';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    AdminModule,
    TypeOrmModule.forFeature([Recipe, CookingTime, Image]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [RecipeResolver, RecipeService, UniqueConstrains],
  exports: [UniqueConstrains],
})
export class RecipeModule {}
