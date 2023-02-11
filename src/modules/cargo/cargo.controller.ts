import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation,ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CargoService } from './cargo.service';
import { CommonApiResponse } from 'src/common/base/base-api-response.dto';
import { CargoDto } from './dto/cargo.dto';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { User } from '../user/model/user.entity';
import { CargoResponse } from './dto/cargoResponse.dto';
import { DriverCargoRequest } from './dto/driverCargoRequest.dto';
import { FinishTransferRequest } from './dto/finishTransferRequest.dto';
import { StartTransferRequest } from './dto/startTransferRequest.dto';


@UseGuards(AuthGuard('api-key'))
@Controller('cargo')
@ApiTags('cargo')
export class CargoController {
    constructor(
        private cargoService: CargoService,
    ) {}

    @Get('/driver/cargo')
    @ApiOperation({ summary: 'Get Cargo By CargoId'})
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get cargo by id',
        type: CargoDto
    })
    async getDriverCargo(@Body() driverCargoRequest: DriverCargoRequest ): Promise<CommonApiResponse<CargoDto>> {
        const cargo = await this.cargoService.getDriverCargo(driverCargoRequest);
        return CommonApiResponse.success<CargoDto>(cargo);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get Cargo By CargoId'})
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get cargo by id',
        type: CargoDto
    })
    async getCargoById(@Param('id') id: string): Promise<CommonApiResponse<CargoDto>> {
        const cargo = await this.cargoService.getCargo(id);
        return CommonApiResponse.success<CargoDto>(cargo);
    }

    @Post('')
    @ApiOperation({ summary: 'Create Cargo'})
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Create cargo',
        type: CargoDto
    })
    async createCargo(@Body() cargoDto: CargoDto,@AuthUser() user: User): Promise<CommonApiResponse<CargoResponse>> {
        const cargo = await this.cargoService.createCargo(cargoDto);
        return CommonApiResponse.success<CargoResponse>(cargo);
    }

    @Put('/driver/start-transfer')
    @ApiOperation({ summary: 'Start Transfer'})
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Start transfer',
        type: String
    })
    async startTransfer(@Body() startTransferRequest: StartTransferRequest): Promise<CommonApiResponse<string>> {
        const cargoId = await this.cargoService.startTransfer(startTransferRequest);
        return CommonApiResponse.success<string>(cargoId);
    }

    @Put('/receiver/finish-transfer')
    @ApiOperation({ summary: 'Finish Transfer'})
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Finish transfer',
        type: String
    })
    async finishTransfer(@Body() finishTransferRequest: FinishTransferRequest): Promise<CommonApiResponse<string>> {
        const cargoId = await this.cargoService.finishTransfer(finishTransferRequest);
        return CommonApiResponse.success<string>(cargoId);
    }
}
