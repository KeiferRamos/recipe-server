import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY, PERMISSIONS } from 'src/decorator/metadata';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    const permission = this.reflector.getAllAndOverride<boolean>(PERMISSIONS, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    if (permission) {
      const ctx = GqlExecutionContext.create(context);
      const [type, token] = ctx
        .getContext()
        .req.headers.authorization.split(' ');

      const { permissions } = this.jwtService.decode(token);
      return permissions.some(({ scope }) => scope === permission[0]);
    }

    return super.canActivate(context);
  }
}
