import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation,ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CargoService } from './cargo.service';
import { CommonApiResponse } from 'src/common/base/base-api-response.dto';
import { CargoDto } from './dto/cargo.dto';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { User } from '../user/model/user.entity';
import { CargoResponse } from './dto/cargoResponse.dto';


@UseGuards(AuthGuard('api-key'))
@Controller('cargo')
@ApiTags('cargo')
export class CargoController {
    constructor(
        private cargoService: CargoService,
    ) {}

    @Get('/driver/:plateNo/:driverPassword')
    @ApiOperation({ summary: 'Get Cargo By CargoId'})
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get cargo by id',
        type: CargoDto
    })
    async getDriverCargo(@Param('driverPassword') driverPassword: string, @Param('plateNo') plateNo: string): Promise<CommonApiResponse<CargoDto>> {
        const cargo = await this.cargoService.getDriverCargo(driverPassword, plateNo);
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

    
}
