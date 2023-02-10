import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../modules/user/model/user.entity';

export const AuthUser = createParamDecorator(
    (_data, ctx: ExecutionContext): User => {
      const req = ctx.switchToHttp().getRequest();
      const user = req.user;
      if(user?.[Symbol.for('isPublic')] ) {
        return;
      }
      return user;

    },
  );