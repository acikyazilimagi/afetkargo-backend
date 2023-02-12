import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseDto } from '../../common/base/base.dto';
import { BaseEntity } from 'typeorm';
import { UserRegisterDto } from '../auth/dto/user-register.dto';
import { UserDto, RoleDto } from './dto';
import { User, Role } from './model';

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
