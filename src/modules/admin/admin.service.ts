import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { EmailerService } from 'src/common/services/emailer/emailer.service';
import { FileUploadService } from 'src/common/services/aws/file-upload.service';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { CargoDto } from '../cargo/dto/cargo.dto';
import { Receiver } from '../cargo/model/receiver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cargo } from '../cargo/model/cargo.entity';
import { Repository } from 'typeorm';
import { CargoFilterDto } from './dto/cargoFilter.dto';
import { User } from '../user/model/user.entity';
import { City } from '../common/model/city.entity';
import { County } from '../common/model/county.entity';
import { CargoService } from '../cargo/cargo.service';
import { CargoLocationDto } from '../cargo/dto';
import { CommonApiResponse } from 'src/common/base';

@Injectable()
export class AdminService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly emailerService: EmailerService,
    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,
    @InjectRepository(Receiver)
    private readonly receiverRepository: Repository<Receiver>,
    private readonly cargoService:CargoService,
  ) {}

  async getPaginatedCargos(options: IPaginationOptions, user: User, filter: CargoFilterDto ): Promise<Pagination<CargoDto>> {

    const queryBuilder = this.cargoRepository.createQueryBuilder('cargo');
    queryBuilder.leftJoinAndMapOne('cargo.createdBy', User, 'user', 'user.id = cargo.createdById');
    queryBuilder.leftJoinAndMapOne('cargo.destinationCity', City, 'destinationCity', 'destinationCity.id = cargo.destinationCityId');
    queryBuilder.leftJoinAndMapOne('cargo.destinationCounty', County, 'destinationCounty', 'destinationCounty.id = cargo.destinationCountyId');

    if(filter)
    {
        if(filter.searchKey && filter.searchKey.length > 0)
        {
            queryBuilder.andWhere('cargo.plateNo = :searchKey OR cargo.driverPhone = :searchKey', {searchKey: filter.searchKey});
        }
    }

    queryBuilder.orderBy('cargo.createdAt', 'DESC');

    const paginatedCargo = await paginate<Cargo>(queryBuilder, options);

    console.log("paginatedKargo: ", paginatedCargo);

    if (!paginatedCargo.items) {
        throw new NotFoundException('Cargo list does not found');
    }

    const cargos = this.mapper.mapArray(paginatedCargo.items, Cargo, CargoDto);

    return new Pagination<CargoDto>(cargos, paginatedCargo.meta,paginatedCargo.links);
  }

  async getCargoLocationById(id: string): Promise<CargoLocationDto> {
      return this.cargoService.getLocation(id);
  }
}
