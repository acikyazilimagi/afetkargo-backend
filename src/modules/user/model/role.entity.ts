import { BaseEntity } from "../../../common/base/base.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { UserRole } from "./user-role.entity";
import { AutoMap } from "@automapper/classes";

@Entity('role')
export class Role {

    @PrimaryColumn()
    @AutoMap()
    id: number;

    @Column({ unique: true })
    @AutoMap()
    name: string;

    @OneToMany(() => UserRole, userRole => userRole.role)
    userRoles: UserRole[];
}
    