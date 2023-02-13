import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { Cargo, Receiver } from '../cargo/model';
import { CargoFilterDto, CargoDto } from '../cargo/dto';
import { User } from '../user/model/user.entity';
import { City, County } from '../common/model';

@Injectable()
export class AdminService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,
    @InjectRepository(Receiver)
    private readonly receiverRepository: Repository<Receiver>,
  ) {}

  async getPaginatedCargos(options: IPaginationOptions, user: User, filter: CargoFilterDto ): Promise<Pagination<CargoDto>> {

    const queryBuilder = this.cargoRepository.createQueryBuilder('cargo');
    queryBuilder.leftJoinAndMapOne('cargo.createdBy', User, 'user', 'user.id = cargo.createdById');
    queryBuilder.leftJoinAndMapOne('cargo.destinationCity', City, 'destinationCity', 'destinationCity.id = cargo.destinationCityId');
    queryBuilder.leftJoinAndMapOne('cargo.destinationCounty', County, 'destinationCounty', 'destinationCounty.id = cargo.destinationCountyId');

    if(filter)
    {
        if(filter.plateNo)
        {
            queryBuilder.andWhere('cargo.plateNo = :plateNo', {plateNo: filter.plateNo});
        }
        if(filter.driverFullName)
        {
            queryBuilder.andWhere('cargo.driverFullName = :driverFullName', {driverFullName: filter.driverFullName});
        }
        if(filter.driverPhone)
        {
            queryBuilder.andWhere('cargo.driverPhone = :driverPhone', {driverPhone: filter.driverPhone});
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
}
