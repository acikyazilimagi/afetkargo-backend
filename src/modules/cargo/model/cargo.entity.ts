import { BaseEntity } from "../../../common/base/base.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { County } from "src/modules/common/model/county.entity";
import { City } from "src/modules/common/model/city.entity";
import { User } from "src/modules/user/model/user.entity";

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
    
    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    created_at: Date;

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
    destinationCountyId: string;

    @Column({ nullable: true })
    @AutoMap()
    destinationCityId: string;

    @Column({ nullable: true })
    @AutoMap()
    createdById: string;

    //TODO county and city relations will be added
    @ManyToOne(() => County)
    @JoinColumn({ name: "destinationCountyId" })
    destinationCounty: County;

    @ManyToOne(() => City)
    @JoinColumn({ name: "destinationCityId" })
    destinationCity: City;

    @ManyToOne(() => User)
    @JoinColumn({ name: "createdById"})
    createdBy: User;
}