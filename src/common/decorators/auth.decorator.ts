import { applyDecorators, Param, ParseUUIDPipe, PipeTransform, SetMetadata, Type, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { RoleType } from "../constants";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/role.guard";
import { PublicRoute } from "./public-route.decorator";

export function Auth(
    roles: RoleType[] = [],
    options?: Partial<{public: boolean}>
): MethodDecorator {
    const isPublicRoute = options?.public;
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(AuthGuard(), RolesGuard),
        ApiBearerAuth(),
        // UseInterceptors(AuthUserInterceptor),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        PublicRoute(isPublicRoute),
      );
}

export function UUIDParam(
    property: string,
    ...pipes: Array<Type<PipeTransform> | PipeTransform>
  ): ParameterDecorator {
    return Param(property, new ParseUUIDPipe({ version: '4' }), ...pipes);
}
