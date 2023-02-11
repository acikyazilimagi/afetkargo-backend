import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CargoDto } from './dto/cargo.dto';
import { ReceiverDto } from './dto/receiver.dto';
import { Cargo } from './model/cargo.entity';
import { Receiver } from './model/receiver.entity';
import { generateCode } from 'src/common/utils/utils';
import { CargoResponse } from './dto/cargoResponse.dto';
import { CARGO_STATUS } from 'src/common/constants';

@Injectable()
export class CargoService {
    constructor (
       
        @InjectMapper()
        private readonly mapper: Mapper,
        @InjectRepository(Cargo)
        private readonly cargoRepository: Repository<Cargo>,
        @InjectRepository(Receiver)
        private readonly receiverRepository: Repository<Receiver>,
    ) {}

    async createCargo (cargoDto: CargoDto) : Promise<CargoResponse> {
        let cargo = this.mapper.map(cargoDto, CargoDto,Cargo);

        cargo.driverPassword = generateCode();
        cargo.receiverPassword = generateCode();
        cargo.status = CARGO_STATUS.WAITING;
        

        const savedCargo =  await this.cargoRepository.save(cargo);


        if (cargoDto.receiverList) {
            const receivers = this.mapper.mapArray(cargoDto.receiverList, Receiver, ReceiverDto);
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

    async getDriverCargo(driverPassword: string, plateNo: string): Promise<CargoDto> {
        const cargo = await this.cargoRepository.findOne({where: {driverPassword: driverPassword, plateNo: plateNo}});

        if(!cargo) { 
            throw new Error("Girilen bilgilere ait kargo bulunamadı. Lütfen bilgilerinizi kontrol edin.");
        }

        //TODO: create maps url

        return this.mapper.map(cargo, Cargo, CargoDto);
    }

    async startTransfer(cargoId: string, driverPassword: string, plateNo: string): Promise<string> {
        const cargo = await this.cargoRepository.findOne({where: {id: cargoId, driverPassword: driverPassword, plateNo: plateNo}});

        if(!cargo) { 
            throw new Error("Girilen bilgilere ait kargo bulunamadı. Lütfen bilgilerinizi kontrol edin.");
        }

        cargo.status = CARGO_STATUS.TRANSFER;
        await this.cargoRepository.save(cargo);

        return cargo.id;
    }

    async finishTransfer(cargoId: string, receiverPassword: string, plateNo: string): Promise<string> {
        const cargo = await this.cargoRepository.findOne({where: {id: cargoId, receiverPassword: receiverPassword, plateNo: plateNo}});

        if(!cargo) { 
            throw new Error("Girilen bilgilere ait kargo bulunamadı. Lütfen bilgilerinizi kontrol edin.");
        }

        cargo.status = CARGO_STATUS.TRANSFERED_WITH_PROBLEM;
        await this.cargoRepository.save(cargo);

        return cargo.id;
    }
    
    async getCargo(cargoId: string): Promise<CargoDto> {

        const cargo = await this.cargoRepository.findOne({where: {id: cargoId}});

        if(!cargo) { 
            throw new Error("Girilen bilgilere ait kargo bulunamadı. Lütfen bilgilerinizi kontrol edin.");
        }

        return this.mapper.map(cargo, Cargo, CargoDto);

    }
}
