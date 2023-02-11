import { BaseEntity } from "../../../common/base/base.entity";
import { Column, Entity} from "typeorm";
import { AutoMap } from "@automapper/classes";


@Entity()
export class CargoLocation extends BaseEntity{
    
    @Column()
    @AutoMap()
    cargoId: string;

    @Column({type: "decimal"})
    @AutoMap()
    lat: number;

    @Column({type: "decimal"})
    @AutoMap()
    long: number;
}