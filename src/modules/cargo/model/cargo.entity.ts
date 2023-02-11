import { BaseEntity } from "../../../common/base/base.entity";
import { Column, Entity} from "typeorm";
import { AutoMap } from "@automapper/classes";

@Entity()
export class Cargo extends BaseEntity{

    @Column()
    @AutoMap()
    plateNo: string;

    @Column()
    @AutoMap()
    driverFullname: string;

    @Column()
    @AutoMap()
    driverPhone: string;

    @Column({ nullable: true })
    @AutoMap()
    inventory: string;

    @Column()
    @AutoMap()
    originAddress: string;

    @Column()
    @AutoMap()
    destinationAddress: string;

    @Column({type: "decimal"})
    @AutoMap()
    originLat: number;

    @Column({ type: "decimal"})
    @AutoMap()
    originLong: number;

    @Column({ nullable: true })
    @AutoMap()
    partialCount: number;

    @Column({ nullable: true })
    thirdPartyToken: string;

    @Column({ nullable: true })
    @AutoMap()
    companyName: string;

    @Column({ default: true })
    @AutoMap()
    isActive: boolean;

    @Column()
    @AutoMap()
    cargoCode: string;

    @Column({ nullable: true })
    @AutoMap()
    driverPassword: string;

    @Column({ nullable: true })
    @AutoMap()
    receiverPassword: string;

    @Column({ nullable: true })
    @AutoMap()
    status: number;

    @Column({ nullable: true })
    @AutoMap()
    countyId: string;

    @Column({ nullable: true })
    @AutoMap()
    cityId: string;

    @Column({ nullable: true })
    @AutoMap()
    createdUser: string;
}