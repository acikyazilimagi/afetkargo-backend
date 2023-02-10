import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseDto } from '../../common/base/base.dto';
import { BaseEntity } from 'typeorm';
import { UserRegisterDto } from '../auth/dto/user-register.dto';
import { UserDto } from './dto/user.dto';
import { User } from './model/user.entity';
import { Role } from './model/role.entity';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, User, UserDto);
      createMap(mapper, UserRegisterDto, User);
      createMap(mapper, User, UserRegisterDto);
      createMap(mapper, Role, RoleDto);
      createMap(mapper, BaseEntity, BaseDto);
    };
  }
}
