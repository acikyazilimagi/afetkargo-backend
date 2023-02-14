import { Body, Controller, DefaultValuePipe, HttpCode, HttpStatus, ParseIntPipe, Post,Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AdminService } from './admin.service';
import { Auth, AuthUser } from 'src/common/decorators';
import { RoleType } from 'src/common/constants';
import { User } from '../user/model/user.entity';
import { CommonApiResponse } from 'src/common/base/base-api-response.dto';
import { CargoDto, CargoFilterDto, ReceiverDto } from '../cargo/dto';

@ApiTags('admin')
@Controller('admin')
@UseGuards(AuthGuard('api-key'))
export class AdminController {
    constructor(
        private adminService: AdminService,
    ) {}

    @Post("cargo")
    @HttpCode(HttpStatus.OK)
    @Auth([RoleType.ADMIN])
    @ApiOkResponse({ type: Pagination<CargoDto> , description: 'Get Cargo List' })
    async getPaginatedCargos(
        @Body() filter: CargoFilterDto, 
        @AuthUser() user: User,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<CommonApiResponse<Pagination<CargoDto>>> {
        limit = limit > 100 ? 100 : limit;
        const cargos = await this.adminService.getPaginatedCargos({ page, limit, route:  'advertisement' }, user, filter);
        return CommonApiResponse.success<Pagination<CargoDto>>(cargos);
    }

    @Post("receiver")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ isArray: true, type: ReceiverDto , description: 'Get Receiver List By Cargo Id' })
    @Auth([RoleType.ADMIN])
    async getCargoReceivers(
        @Query('cargoId') cargoId: string,
    ): Promise<CommonApiResponse<ReceiverDto[]>> {
        const receivers = await this.adminService.getReceiversByCargoId(cargoId);
        return CommonApiResponse.success<ReceiverDto[]>(receivers);
    }
}
