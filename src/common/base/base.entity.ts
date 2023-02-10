import { AutoMap } from "@automapper/classes";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export class BaseEntity {

    @PrimaryGeneratedColumn()
    @AutoMap()
    id: number;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    @AutoMap()
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
    })
    updatedAt: Date;
}