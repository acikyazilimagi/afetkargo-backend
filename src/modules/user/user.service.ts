import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './model/user.entity';
import { UserRegisterDto } from '../auth/dto/user-register.dto';
import { UserDto } from './dto/user.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { v4 as uuidv4 } from 'uuid';
import { EmailerService } from 'src/common/services/emailer/emailer.service';
import { CommonApiResponse } from '../../common/base/base-api-response.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { validateHash } from 'src/common/utils/hash';
import { ResetPasswordMailDto } from './dto/reset-password-mail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UserRole } from './model/user-role.entity';
import { Role } from './model/role.entity';
import { FileUploadService } from 'src/common/services/aws/file-upload.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly emailerService: EmailerService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async createUser(userRegisterDto: UserRegisterDto): Promise<User> {
    const existUser = await this.userRepository.findOne({
      email: userRegisterDto.email,
      phone: userRegisterDto.phone,
    });
    if (existUser) {
      throw new ConflictException(
        'User email or registery no is already exist',
      );
    }
    const mappedUser = this.mapper.map(userRegisterDto, UserRegisterDto, User);
    mappedUser.isActive = true;
    const createdUser = await this.userRepository.save(mappedUser);
    await this.createBasicRole(createdUser.id, userRegisterDto.roleId);
    return createdUser;
  }

  async getUser(userId: string): Promise<CommonApiResponse<UserDto>> {
    const user = await this.userRepository.findOne({ id: userId });
    return CommonApiResponse.success(this.mapper.map(user, UserDto, User));
  }

  async activateUser(token: string): Promise<CommonApiResponse<void>> {
    const user = await this.userRepository.findOne({ thirdPartyToken: token });
    if (!user) {
      throw new NotFoundException('Token not found');
    }
    await this.activateUserDb(user);
    return CommonApiResponse.success();
  }

  async updatePassword(
    updatePasswordDto: UpdatePasswordDto,
    user: User,
  ): Promise<CommonApiResponse<void>> {
    if (
      await validateHash(updatePasswordDto.previous_password, user.password)
    ) {
      user.password = updatePasswordDto.password;
      await this.userRepository.save(user);
      return CommonApiResponse.success();
    } else {
      throw new UnauthorizedException('Password does not matched');
    }
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<CommonApiResponse<void>> {
    const user = await this.userRepository.findOne({
      thirdPartyToken: resetPasswordDto.token,
    });
    if (!user) {
      throw new NotFoundException('Token is not valid');
    }
    user.password = resetPasswordDto.password;
    user.thirdPartyToken = null;
    await this.userRepository.save(user);
    return CommonApiResponse.success();
  }

  async sendResetPasswordMail(
    resetPasswordMailDto: ResetPasswordMailDto,
  ): Promise<void> {
    const user = await this.findByEmail(resetPasswordMailDto.email);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    const token = uuidv4();
    user.thirdPartyToken = token;
    await this.userRepository.save(user);
    await this.emailerService.sendPasswordReset(user, token);
  }

  private async activateUserDb(user: User): Promise<User> {
    try {
      user.isActive = true;
      user.thirdPartyToken = null;
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async createUserRole(
    userId: string,
    roleId: number,
  ): Promise<UserRole> {
    try {
      return await this.userRoleRepository.save({ userId, roleId });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async createBasicRole(
    userId: string,
    roleId: number,
  ): Promise<UserRole> {
    try {
      const basicRole = await this.roleRepository.findOne({ id: roleId });
      return await this.userRoleRepository.save({
        userId,
        roleId: basicRole.id,
      });
    } catch (error) {
      throw new BadRequestException(
        `Can not create role for user id: ${userId}`,
      );
    }
  }

  async updateUser(updateUserDto: UpdateUserDto, user: User): Promise<void> {
    if (updateUserDto.userId != user.id) {
      throw new Error('User.Data.User.NotSame');
    }

    let userToBeUpdate = await this.userRepository.findOne({
      id: updateUserDto.userId,
    });

    if (!userToBeUpdate) {
      throw new Error('User.Data.User.NotExist');
    }
    userToBeUpdate.name = updateUserDto.name;
    userToBeUpdate.surname = updateUserDto.surname;
    userToBeUpdate.phone = updateUserDto.phone;

    await this.userRepository.save(userToBeUpdate);
  }

  async getRoles(): Promise<RoleDto[]> {
    const roles = await this.roleRepository.find({ where: { id: Not(4)}, order: { id: 'ASC' } });
    return this.mapper.mapArray(roles, Role, RoleDto);
  }
}
