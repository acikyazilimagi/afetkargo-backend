import { BaseEntity } from "../../../common/base/base.entity";
import { Column, Entity} from "typeorm";
import { AutoMap } from "@automapper/classes";


@Entity()
export class CargoLocation extends BaseEntity{
    
    @Column()
    @AutoMap()
    cargoId: string;

    @Column()
    @AutoMap()
    lat: number;

    @Column()
    @AutoMap()
    long: number;
}