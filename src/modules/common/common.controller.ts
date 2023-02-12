import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation,ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommonService } from './common.service';
import { CityDto, CountyDto } from './dto';
import { CommonApiResponse } from 'src/common/base/base-api-response.dto';

@UseGuards(AuthGuard('api-key'))
@Controller('common')
@ApiTags('common')
export class CommonController {
    constructor(
        private commonService: CommonService,
    ) {}

    @Get('cities')
    @ApiOperation({ summary: 'Get Cities'})
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get cities',
        type: [CityDto]
    })
    async getCities(): Promise<CommonApiResponse<CityDto[]>> {
        const cities = await this.commonService.getCities();
        return CommonApiResponse.success<CityDto[]>(cities); 
    }

    @Get('counties/:cityId')
    @ApiOperation({ summary: 'Get Counties By CityId'})
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get counties by city',
        type: [CountyDto]
    })
    async getCountiesByCity(@Param('cityId') cityId: number): Promise<CommonApiResponse<CityDto[]>> {
        const counties = await this.commonService.getCountiesByCityId(cityId);
        return CommonApiResponse.success<CityDto[]>(counties); 
    }
}
