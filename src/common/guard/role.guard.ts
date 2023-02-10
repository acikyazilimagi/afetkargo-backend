import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as _ from 'lodash';
import { Role } from 'src/modules/user/model/role.entity';
import { UserRole } from 'src/modules/user/model/user-role.entity';
import { User } from 'src/modules/user/model/user.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (_.isEmpty(roles)) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = <User>request.user;
    const userWithRole = await  getRepository(UserRole).find({
      where: { userId : user.id},
      relations: ['role']
    })
    const userRoles = userWithRole.map(x => x.role.name);
    const found = roles.find(e => userRoles.includes(e.toString()));
    if(found) {
      return true;
    }
    else return false;
  }
}