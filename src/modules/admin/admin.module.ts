import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { EmailerModule } from '../../common/services/emailer/emailer.module';
import { User } from '../user/model/user.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminProfile } from './admin.profile';
import { Cargo, Receiver } from '../cargo/model';

@Module({
    imports: [
        EmailerModule,
        TypeOrmModule.forFeature([User, Cargo, Receiver]),
        forwardRef(() => AuthModule),
    ],
    providers: [AdminService, AdminProfile,],
    controllers: [AdminController],
    exports: [AdminService, TypeOrmModule]
})
export class AdminModule {}
