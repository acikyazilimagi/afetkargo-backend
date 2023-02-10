import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityDto } from './dto/city.dto';
import { CountyDto } from './dto/county.dto';
import { City } from './model/city.entity';
import { County } from './model/county.entity';

@Injectable()
export class CommonService {
    constructor (
        @InjectRepository(City)
        private cityRepository: Repository<City>,
        @InjectRepository(County)
        private countyRepository: Repository<County>,
        @InjectMapper()
        private readonly mapper: Mapper,
    ) {}

    async getCities(): Promise<CityDto[]> {

        const cities = await this.cityRepository.find();
        if (!cities) {
            throw new Error('Common.Data.Cities.NotFound');
        }

        return this.mapper.mapArray(cities, City, CityDto);
    }

    async getCounties(): Promise<CountyDto[]> {
        const counties = await this.countyRepository.find();
        return this.mapper.mapArray(counties, County, CountyDto);
    }

    async getCountiesByCityId(cityId: number): Promise<CountyDto[]> {  
        const counties = await this.countyRepository.find({ where: { cityId: cityId } });
        if(!counties){
            throw new Error('Common.Data.Counties.NotFound');
        }

        return this.mapper.mapArray(counties, County, CountyDto);
    }
    
}
