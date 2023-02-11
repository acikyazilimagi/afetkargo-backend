import { Body, Controller, DefaultValuePipe, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation,ApiResponse, ApiSecurity, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RoleType } from 'src/common/constants';
import { CargoDto } from '../cargo/dto/cargo.dto';
import { User } from '../user/model/user.entity';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CargoFilterDto } from './dto/cargoFilter.dto';
import { CommonApiResponse } from 'src/common/base/base-api-response.dto';

@ApiTags('admin')
@Controller('admin')
@UseGuards(AuthGuard('api-key'))
export class AdminController {
    constructor(
        private adminService: AdminService,
    ) {}

    @Get("me")
    @HttpCode(HttpStatus.OK)
    @Auth([RoleType.USER, RoleType.ADMIN])
    @ApiOkResponse({ type: CargoDto , description: 'Get Cargo List' })
    async getCurrentUser(
        @Body() filter: CargoFilterDto, 
        @AuthUser() user: User,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<CommonApiResponse<Pagination<CargoDto>>> {
        limit = limit > 100 ? 100 : limit;
        const cargos = await this.adminService.getCargoPaginated({ page, limit, route:  'advertisement' }, user, filter);
        return CommonApiResponse.success<Pagination<CargoDto>>(cargos);
    }
}
