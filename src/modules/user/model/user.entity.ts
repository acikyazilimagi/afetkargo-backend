import { BaseEntity } from "../../../common/base/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { UserRole } from "./user-role.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export class User extends BaseEntity{

    @Column()
    @AutoMap()
    name: string;

    @Column()
    @AutoMap()
    surname: string;

    @Column()
    @AutoMap()
    password: string;

    @Column({ nullable: true })
    @AutoMap()
    email: string;

    @Column()
    @AutoMap()
    phone: string;
    
    @Column({ default: false })
    @AutoMap()
    isActive: boolean;

    @Column({ 
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    @AutoMap()
    lastLogin: Date;

    @Column({ nullable: true })
    thirdPartyToken: string;

    @Column({ nullable: true })
    @AutoMap()
    companyName: string;

    @OneToMany(() => UserRole, userRole => userRole.user)
    userRoles: UserRole[];
}