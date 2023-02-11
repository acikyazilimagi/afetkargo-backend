import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getCargoPaginated(options: IPaginationOptions, user: User, filter: CargoFilterDto ): Promise<Pagination<CargoDto>> {

    const queryBuilder = this.cargoRepository.createQueryBuilder('cargo');
    // queryBuilder.where('adv.ownerUserId = :ownerUserId', { ownerUserId: user.id });
    // queryBuilder.leftJoinAndMapOne('adv.ownerUser', User, 'user', 'user.id = adv.ownerUserId');
    // queryBuilder.leftJoinAndMapOne('adv.advertisementStatus', AdvertisementStatus, 'advStatus', 'advStatus.id = adv.advertisementStatusId')
    // queryBuilder.leftJoinAndMapOne('adv.advertisementType', AdvertisementType, 'advType', 'advType.id = adv.advertisementTypeId')
    // queryBuilder.leftJoinAndMapOne('adv.loadType', LoadType, 'loadType', 'loadType.id = adv.loadTypeId');
    // queryBuilder.leftJoinAndMapOne('adv.materialType', MaterialType, 'materialType', 'materialType.id = adv.materialTypeId');
    // queryBuilder.leftJoinAndMapOne('adv.vehicle', Vehicle, 'vehicle', 'vehicle.id = adv.vehicleId');
    // queryBuilder.leftJoinAndMapOne('adv.originCity', City, 'originCity', 'originCity.id = adv.originCityId');
    // queryBuilder.leftJoinAndMapOne('adv.originCounty', County, 'originCounty', 'originCounty.id = adv.originCountyId');
    // queryBuilder.leftJoinAndMapOne('adv.destinationCity', City, 'destinationCity', 'destinationCity.id = adv.destinationCityId');
    // queryBuilder.leftJoinAndMapOne('adv.destinationCounty', County, 'destinationCounty', 'destinationCounty.id = adv.destinationCountyId');


    // if(filter)
    // {
    //     if(filter.hasOffer)
    //     {
    //         queryBuilder.innerJoinAndMapOne('adv.offer', Offer, 'offer', 'offer.advertisementId = adv.id');
    //     }

    //     if(filter.advertisementStatus && filter.advertisementStatus != 0)
    //     {
    //         queryBuilder.andWhere('adv.advertisementStatusId = :advertisementStatus', {advertisementStatus: filter.advertisementStatus});
    //     }
    //     if(filter.advertisementType && filter.advertisementType != 0)
    //     {
    //         queryBuilder.andWhere('adv.advertisementTypeId = :advertisementType', {advertisementType: filter.advertisementType});
    //     }
    // }

    queryBuilder.orderBy('adv.createdAt', 'DESC');

    const paginatedCargo = await paginate<Cargo>(queryBuilder, options);

    
    if (!paginatedCargo.items) {
        throw new Error('Advertisement.Data.Advertisement.NotFound');
    }

    const cargos = this.mapper.mapArray(paginatedCargo.items, Cargo, CargoDto);

    return new Pagination<CargoDto>(cargos, paginatedCargo.meta,paginatedCargo.links);
  }
}
