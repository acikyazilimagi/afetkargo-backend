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
  ) {}

  async getPaginatedCargos(options: IPaginationOptions, user: User, filter: CargoFilterDto ): Promise<Pagination<CargoDto>> {

    const queryBuilder = this.cargoRepository.createQueryBuilder('cargo');
    // queryBuilder.where('adv.ownerUserId = :ownerUserId', { ownerUserId: user.id });
    queryBuilder.leftJoinAndMapOne('cargo.createdBy', User, 'user', 'user.id = cargo.createdById');
    // queryBuilder.leftJoinAndMapOne('adv.advertisementStatus', AdvertisementStatus, 'advStatus', 'advStatus.id = adv.advertisementStatusId')
    // queryBuilder.leftJoinAndMapOne('adv.advertisementType', AdvertisementType, 'advType', 'advType.id = adv.advertisementTypeId')
    // queryBuilder.leftJoinAndMapOne('adv.loadType', LoadType, 'loadType', 'loadType.id = adv.loadTypeId');
    // queryBuilder.leftJoinAndMapOne('adv.materialType', MaterialType, 'materialType', 'materialType.id = adv.materialTypeId');
    // queryBuilder.leftJoinAndMapOne('adv.vehicle', Vehicle, 'vehicle', 'vehicle.id = adv.vehicleId');
    queryBuilder.leftJoinAndMapOne('cargo.destinationCity', City, 'destinationCity', 'destinationCity.id = cargo.destinationCityId');
    queryBuilder.leftJoinAndMapOne('cargo.destinationCounty', County, 'destinationCounty', 'destinationCounty.id = cargo.destinationCountyId');

    // if(filter)
    // {
    //     if(filter.plateNo)
    //     {
    //         queryBuilder.andWhere('cargo.plateNo = :plateNo', {plateNo: filter.plateNo});
    //     }
    //     if(filter.driverFullName)
    //     {
    //         queryBuilder.andWhere('cargo.driverFullName = :driverFullName', {driverFullName: filter.driverFullName});
    //     }
    //     if(filter.driverPhone)
    //     {
    //         queryBuilder.andWhere('cargo.driverPhone = :driverPhone', {driverPhone: filter.driverPhone});
    //     }
    // }

    queryBuilder.orderBy('cargo.createdAt', 'DESC');

    const paginatedCargo = await paginate<Cargo>(queryBuilder, options);

    
    if (!paginatedCargo.items) {
        throw new NotFoundException('Cargo list does not found');
    }

    const cargos = this.mapper.mapArray(paginatedCargo.items, Cargo, CargoDto);

    return new Pagination<CargoDto>(cargos, paginatedCargo.meta,paginatedCargo.links);
  }
}
