import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CargoDto } from './dto/cargo.dto';
import { CargoLocationDto } from './dto/cargoLocation.dto';
import { Cargo } from './model/cargo.entity';
import { Receiver } from './model/receiver.entity';
import { CargoLocation } from './model/cargo-location.entity';
import { generateCode, setCargoStatus } from 'src/common/utils/utils';
import { CargoResponse } from './dto/cargoResponse.dto';
import { CARGO_STATUS } from 'src/common/constants';
import { DriverCargoRequest } from './dto/driverCargoRequest.dto';
import { ReceiverCargoRequest } from './dto/receiverCargoRequest.dto';
import { FinishTransferRequest } from './dto/finishTransferRequest.dto';
import { StartTransferRequest } from './dto/startTransferRequest.dto';
import { CreateCargoDto } from './dto/createCargo.dto';
import { CreateReceiverDto } from './dto/createReceiver.dto';
import { DriverCargoResponse } from './dto/driverCargoResponse.dto';
import { ReceiverCargoResponse } from './dto/receiverCargoResponse.dto';
import { User } from '../user/model/user.entity';

@Injectable()
export class CargoService {
    constructor (
       
        @InjectMapper()
        private readonly mapper: Mapper,
        @InjectRepository(Cargo)
        private readonly cargoRepository: Repository<Cargo>,
        @InjectRepository(Receiver)
        private readonly receiverRepository: Repository<Receiver>,
        @InjectRepository(CargoLocation)
        private readonly cargoLocationRepository: Repository<CargoLocation>,
    ) {}

    async createCargo (user: User,createCargoDto: CreateCargoDto) : Promise<CargoResponse> {
        let cargo = this.mapper.map(createCargoDto, CreateCargoDto,Cargo);

        // TODO cargo code for unique control 
        cargo.driverPassword = generateCode();
        cargo.receiverPassword = generateCode();
        cargo.cargoCode = generateCode();
        cargo.status = CARGO_STATUS.WAITING;
        cargo.createdById=user.id;
        

        const savedCargo =  await this.cargoRepository.save(cargo);

        console.log("Saved Cargo detail: ", savedCargo);

        if (createCargoDto.receiverList) {
            const receivers = this.mapper.mapArray(createCargoDto.receiverList, CreateReceiverDto, Receiver );
            receivers.forEach(receiver => { receiver.cargoId = savedCargo.id });
            await this.receiverRepository.save(receivers);
        }

        let cargoResponse = new CargoResponse();
        cargoResponse.cargoId = savedCargo.id;
        cargoResponse.cargoCode = savedCargo.cargoCode;
        cargoResponse.driverPassword = savedCargo.driverPassword;
        cargoResponse.receiverPassword = savedCargo.receiverPassword;

        return cargoResponse;

    }

    async getCargo(cargoId: string): Promise<CargoDto> {

        const cargo = await this.cargoRepository.findOne({where: {id: cargoId}});

        if(!cargo) { 
            throw new Error("Girilen bilgilere ait kargo bulunamadı. Lütfen bilgilerinizi kontrol edin.");
        }

        return this.mapper.map(cargo, Cargo, CargoDto);

    }

    async getDriverCargo(driverCargoRequest: DriverCargoRequest): Promise<DriverCargoResponse> {
        const cargo = await this.cargoRepository.findOne({where: {driverPassword: driverCargoRequest.driverPassword, plateNo: driverCargoRequest.plateNo}});

        if(!cargo) { 
            throw new NotFoundException("Girilen bilgilere ait kargo bulunamadı. Lütfen bilgilerinizi kontrol edin.");
        }

        if((cargo.status != CARGO_STATUS.WAITING) && (cargo.status != CARGO_STATUS.TRANSFER)) {
            throw new BadRequestException("Girilen bilgilere ait aktif kargo bulunamadı. Lütfen bilgilerinizi kontrol edin.");
        }

        //TODO: create maps url

        return this.mapper.map(cargo, Cargo, DriverCargoResponse);
    }

    async getReceiverCargo(receiverCargoRequest: ReceiverCargoRequest): Promise<ReceiverCargoResponse> {
        const cargo = await this.cargoRepository.findOne({where: {receiverPassword: receiverCargoRequest.receiverPassword, plateNo: receiverCargoRequest.plateNo}});

        if(!cargo) { 
            throw new NotFoundException("Girilen bilgilere ait kargo bulunamadı. Lütfen bilgilerinizi kontrol edin.");
        }

        if((cargo.status != CARGO_STATUS.WAITING) && (cargo.status != CARGO_STATUS.TRANSFER)) {
            throw new BadRequestException("Girilen bilgilere ait aktif kargo bulunamadı. Lütfen bilgilerinizi kontrol edin.");
        }

        let receiverResponse =this.mapper.map(cargo, Cargo, ReceiverCargoResponse);

        let location = await this.cargoLocationRepository.findOne({where:{cargoId:cargo.id},order:{createdAt:"DESC"}});
        if(!location){
            throw new NotFoundException("Kargoya ait lokasyon bilgisi bulunamadı. Lütfen tekrar deneyin.");
        }
        receiverResponse.lat=location.lat;
        receiverResponse.long=location.long;

        return receiverResponse;
    }

    async startTransfer(startTransferRequest: StartTransferRequest): Promise<string> {
        const cargo = await this.cargoRepository.findOne({where: { driverPassword: startTransferRequest.driverPassword, plateNo: startTransferRequest.plateNo}});

        if(!cargo) { 
            throw new Error("Girilen bilgilere ait kargo bulunamadı. Lütfen bilgilerinizi kontrol edin.");
        }

        cargo.status = CARGO_STATUS.TRANSFER;
        await this.cargoRepository.save(cargo);

        return cargo.id;
    }

    async finishTransfer( finishTransferRequest: FinishTransferRequest): Promise<string> {
        const cargo = await this.cargoRepository.findOne({where: { receiverPassword: finishTransferRequest.receiverPassword, plateNo: finishTransferRequest.plateNo}});

        if(!cargo) { 
            throw new Error("Girilen bilgilere ait kargo bulunamadı. Lütfen bilgilerinizi kontrol edin.");
        }

        

        cargo.status = setCargoStatus(finishTransferRequest.status);
        await this.cargoRepository.save(cargo);

        return cargo.id;
    }

    async setLocation (cargoLocationDto: CargoLocationDto) : Promise<string> {
        let location = this.mapper.map(cargoLocationDto, CargoLocationDto, CargoLocation);
        const savedLocation =  await this.cargoLocationRepository.save(location);
        return savedLocation.id;
    }

    async getLocation(cargoId: string): Promise<CargoLocationDto> {
        const cargo = await this.cargoRepository.findOne({where: {id: cargoId}});

        if(!cargo) { 
            throw new NotFoundException("Girilen bilgilere ait kargo bulunamadı. Lütfen bilgilerinizi kontrol edin.");
        }

        if((cargo.status != CARGO_STATUS.WAITING) && (cargo.status != CARGO_STATUS.TRANSFER)) {
            throw new BadRequestException("Girilen bilgilere ait aktif kargo bulunamadı. Lütfen bilgilerinizi kontrol edin.");
        }

        let location = await this.cargoLocationRepository.findOne({where:{cargoId:cargo.id},order:{createdAt:"DESC"}});
        if(!location){
            throw new NotFoundException("Kargoya ait lokasyon bilgisi bulunamadı. Lütfen tekrar deneyin.");
        }
        return this.mapper.map(location, CargoLocation, CargoLocationDto);
    }
}
