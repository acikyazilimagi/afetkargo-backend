import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation,ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { CommonApiResponse } from '../../common/base/base-api-response.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { User } from './model/user.entity';
import { ResetPasswordMailDto } from './dto/reset-password-mail.dto';
import { Auth } from '../../common/decorators/auth.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleDto } from './dto/role.dto';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard('api-key'))
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Get By User Id'})
    @HttpCode(HttpStatus.OK)
    @Auth()
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Get user by id',
        type: UserDto
    })
    getUser(@Param('id') userId: number): Promise<CommonApiResponse<UserDto>> {
        return this.userService.getUser(userId);
    }

    @Post('activate/:token')
    @ApiOperation({ summary: "Activate User Email"})
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success',
        type: CommonApiResponse
    })
    activateUserAccount(@Param('token') token: string): Promise<CommonApiResponse<void>> {
        return this.userService.activateUser(token);
    }

    @Post('update_password')
    @ApiSecurity('bearer')
    @Auth()
    @ApiOperation({ summary: 'Update Password'})
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success',
        type: CommonApiResponse
    })
    updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @AuthUser() user: User): Promise<CommonApiResponse<void>> {
        return this.userService.updatePassword(updatePasswordDto, user);
    }

    @Post("reset_password")
    @ApiOperation({ summary: 'Reset Passoword'})
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Reset Password',
        type: CommonApiResponse
    })
    resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<CommonApiResponse<void>> {
        return this.userService.resetPassword(resetPasswordDto);
    }

    @Post('reset_password/mail')
    @ApiOperation({ summary: 'Send Password Reset Mail'})
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success',
        type: CommonApiResponse
    })
    sendResetPasswordMail(@Body() resetPasswordMailDto: ResetPasswordMailDto): Promise<void> {
        return this.userService.sendResetPasswordMail(resetPasswordMailDto);
    }

    @Put()
    @ApiSecurity('bearer')
    @Auth()
    @ApiResponse({ status: HttpStatus.OK})
    async updateUser(@AuthUser() user: User, @Body() updateUserDto: UpdateUserDto): Promise<CommonApiResponse<void>> {
        console.log(updateUserDto);
        await this.userService.updateUser(updateUserDto,user);

        return CommonApiResponse.success<void>();
    }

    @Get('/list/role')
    @ApiOperation({ summary: 'Get User Roles'})
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get user user roles',
        type: [RoleDto]
    })
    async getRoles(): Promise<CommonApiResponse<RoleDto[]>> {
        const roles = await this.userService.getRoles();
        return CommonApiResponse.success<RoleDto[]>(roles);
    }
}
