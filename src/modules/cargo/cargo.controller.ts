import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation,ApiResponse,ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CargoService } from './cargo.service';
import { CommonApiResponse } from 'src/common/base/base-api-response.dto';
import { RoleType } from 'src/common/constants';
import { AuthUser, Auth } from 'src/common/decorators';
import { User } from '../user/model/user.entity';
import { CargoDto, CargoLocationDto,CreateCargoLocationDto, CargoResponse, CreateCargoDto, DriverCargoRequest, DriverCargoResponse, FinishTransferRequest, ReceiverCargoRequest, ReceiverCargoResponse, StartTransferRequest } from './dto';

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
    // @Auth([RoleType.USER, RoleType.ADMIN])
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
    @ApiOperation({ summary: 'Get Cargo Driver Info'})
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get Cargo By Driver Info',
        type: CargoDto
    })
    // TODO Get requeste çevrilicek ve driver bilgileri middleware içeriisnde kontrol edilecek
    async getDriverCargo(@Body() driverCargoRequest: DriverCargoRequest ): Promise<CommonApiResponse<DriverCargoResponse>> {
        const cargo = await this.cargoService.getDriverCargo(driverCargoRequest);
        return CommonApiResponse.success<DriverCargoResponse>(cargo);
    }

    @Post('/receiver/cargo')
    @ApiOperation({ summary: 'Get Receiver Cargo By Receiver Info'})
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
    async setLocation(@Body() createCargoLocationDto: CreateCargoLocationDto): Promise<CommonApiResponse<string>> {
        console.log("create cargo location dto response body: ", createCargoLocationDto);
        const cargo = await this.cargoService.setLocation(createCargoLocationDto);
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
