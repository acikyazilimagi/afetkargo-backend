import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cargo, Receiver, CargoLocation } from './model';
import { generateCode, setCargoStatus } from 'src/common/utils/utils';
import { CARGO_STATUS } from 'src/common/constants';
import { User } from '../user/model';
import { CargoDto, CargoLocationDto, CargoResponse, CreateCargoDto, CreateCargoLocationDto, CreateReceiverDto, DriverCargoRequest, DriverCargoResponse, FinishTransferRequest, ReceiverCargoRequest, ReceiverCargoResponse, StartTransferRequest } from './dto';

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

        var existedCargo = await this.cargoRepository.findOne({ plateNo: createCargoDto.plateNo.toUpperCase(), status: CARGO_STATUS.WAITING || CARGO_STATUS.TRANSFER});
        if(existedCargo) {
            throw new BadRequestException(`Plate number with ${existedCargo.plateNo} is already in progress.`);
        }
        let cargo = this.mapper.map(createCargoDto, CreateCargoDto,Cargo);

        // TODO cargo code for unique control 
        cargo.driverPassword = generateCode();
        cargo.receiverPassword = generateCode();
        cargo.cargoCode = generateCode();
        cargo.status = CARGO_STATUS.WAITING;
        cargo.createdById=user.id;
        const savedCargo =  await this.cargoRepository.save(cargo);

        if (createCargoDto.receiverList) {
            const receivers = this.mapper.mapArray(createCargoDto.receiverList, CreateReceiverDto, Receiver );
            receivers.forEach(receiver => { receiver.cargoId = savedCargo.id });
            await this.receiverRepository.save(receivers);
        }

        let cargoResponse = new CargoResponse();
        cargoResponse.cargoId = savedCargo.id;
        cargoResponse.plateNo = savedCargo.plateNo;
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

        let driverResponse=this.mapper.map(cargo, Cargo, DriverCargoResponse);
        let receiverList =await this.receiverRepository.find({where:{cargoId:cargo.id}});
        driverResponse.receiverList=receiverList;
        return driverResponse;
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

    async setLocation (createCargoLocationDto: CreateCargoLocationDto) : Promise<string> {
        let location = this.mapper.map(createCargoLocationDto, CreateCargoLocationDto, CargoLocation);
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
