import { BaseEntity } from "../../../common/base/base.entity";
import { Column, Entity} from "typeorm";
import { AutoMap } from "@automapper/classes";


@Entity()
export class Receiver extends BaseEntity{
    
    @Column()
    @AutoMap()
    cargoId: string;

    @Column()
    @AutoMap()
    receiverFullname: string;

    @Column()
    @AutoMap()
    receiverPhone: string;

    @Column()
    @AutoMap()
    destinationAddress: string;

    @Column()
    @AutoMap()
    destinationLat: number;

    @Column()
    @AutoMap()
    destinationLong: number;
}