import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class City {

    @PrimaryColumn()
    @AutoMap()
    id: number;

    @Column()
    @AutoMap()
    name: string;
}