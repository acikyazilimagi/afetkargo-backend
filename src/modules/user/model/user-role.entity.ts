import { BaseEntity } from "../../../common/base/base.entity";
import {  Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Role } from "./role.entity";
import { User } from "./user.entity";

@Entity()
export class UserRole extends BaseEntity {
    @Column()
    userId: number;

    @Column()
    roleId: number;

    @ManyToOne(() => User, user => user.userRoles)
    @JoinColumn({ name: "userId" })
    user: User;

    @ManyToOne(() => Role, role => role.userRoles)
    @JoinColumn({ name: "roleId" })
    role: Role;
}