import { AutoMap } from "@automapper/classes";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./city.entity";

@Entity()
export class County {

    @PrimaryGeneratedColumn()
    @AutoMap()
    id: number;

    @Column()
    @AutoMap()
    name: string;

    @Column()
    @AutoMap()
    cityId: number;

    @ManyToOne(() => City)
    @JoinColumn({ name: 'cityId'})
    @AutoMap()
    city: City;
    
}