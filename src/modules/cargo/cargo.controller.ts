import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation,ApiResponse,ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CargoService } from './cargo.service';
import { CommonApiResponse } from 'src/common/base/base-api-response.dto';
import { CargoDto } from './dto/cargo.dto';
import { CargoLocationDto } from './dto/cargoLocation.dto';
import { CargoResponse } from './dto/cargoResponse.dto';
import { DriverCargoRequest } from './dto/driverCargoRequest.dto';
import { ReceiverCargoRequest } from './dto/receiverCargoRequest.dto';
import { FinishTransferRequest } from './dto/finishTransferRequest.dto';
import { StartTransferRequest } from './dto/startTransferRequest.dto';
import { CreateCargoDto } from './dto/createCargo.dto';
import { DriverCargoResponse } from './dto/driverCargoResponse.dto';
import { ReceiverCargoResponse } from './dto/receiverCargoResponse.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RoleType } from 'src/common/constants';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { User } from '../user/model/user.entity';


@UseGuards(AuthGuard('api-key'))
@Controller('cargo')
@ApiTags('cargo')
export class CargoController {
    constructor(
        private cargoService: CargoService,
    ) {}

    @Post('')
    @ApiOperation({ summary: 'Create Cargo'})
    @HttpCode(HttpStatus.OK)
    @ApiSecurity('bearer')
    @Auth([RoleType.USER, RoleType.ADMIN])
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Create cargo',
        type: CargoResponse
    })
    async createCargo(@Body() cargoDto: CreateCargoDto,@AuthUser() user: User): Promise<CommonApiResponse<CargoResponse>> {
        const cargo = await this.cargoService.createCargo(user,cargoDto);
        return CommonApiResponse.success<CargoResponse>(cargo);
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
    
    @Post('/driver/cargo')
    @ApiOperation({ summary: 'Get Cargo By CargoId'})
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get cargo by id',
        type: CargoDto
    })
    // TODO Get requeste çevrilicek ve driver bilgileri middleware içeriisnde kontrol edilecek
    async getDriverCargo(@Body() driverCargoRequest: DriverCargoRequest ): Promise<CommonApiResponse<DriverCargoResponse>> {
        const cargo = await this.cargoService.getDriverCargo(driverCargoRequest);
        return CommonApiResponse.success<DriverCargoResponse>(cargo);
    }

    @Post('/receiver/cargo')
    @ApiOperation({ summary: 'Get Cargo By CargoId'})
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get cargo by id',
        type: CargoDto
    })
    // TODO Get requeste çevrilicek ve driver bilgileri middleware içeriisnde kontrol edilecek
    async getReceiverCargo(@Body() receiverCargoRequest: ReceiverCargoRequest ): Promise<CommonApiResponse<ReceiverCargoResponse>> {
        const cargo = await this.cargoService.getReceiverCargo(receiverCargoRequest);
        return CommonApiResponse.success<ReceiverCargoResponse>(cargo);
    }

    @Post('/driver/set-location')
    @ApiOperation({ summary: 'Set location'})
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Set location',
        type: CargoLocationDto
    })
    async setLocation(@Body() cargoLocationDto: CargoLocationDto): Promise<CommonApiResponse<string>> {
        const cargo = await this.cargoService.setLocation(cargoLocationDto);
        return CommonApiResponse.success<string>(cargo);
    }

    @Get('/receiver/:id')
    @ApiOperation({ summary: 'Get Location By CargoId'})
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get location by id',
        type: CargoDto
    })
    async getLocationById(@Param('id') id: string): Promise<CommonApiResponse<CargoLocationDto>> {
        const cargo = await this.cargoService.getLocation(id);
        return CommonApiResponse.success<CargoLocationDto>(cargo);
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
