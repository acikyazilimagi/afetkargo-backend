import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { EmailerModule } from '../../common/services/emailer/emailer.module';
import { User } from '../user/model/user.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminProfile } from './admin.profile';
import { Cargo } from '../cargo/model/cargo.entity';
import { Receiver } from '../cargo/model/receiver.entity';
import { CargoModule } from '../cargo/cargo.module';

@Module({
    imports: [
        EmailerModule,
        TypeOrmModule.forFeature([User, Cargo, Receiver]),
        forwardRef(() => AuthModule),
        CargoModule
    ],
    providers: [AdminService, AdminProfile,],
    controllers: [AdminController],
    exports: [AdminService, TypeOrmModule]
})
export class AdminModule {}
