import { Role } from './model/role.entity';
import { UserRole } from './model/user-role.entity';
import { User } from './model/user.entity';

// export const userProviders = [
//   {
//     provide: 'USER_REPOSITORY',
//     useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
//     inject: ['DATA_SOURCE'],
//   },
// ];

// export const userRoleProviders = [
//     {
//       provide: 'USER_ROLE_REPOSITORY',
//       useFactory: (dataSource: DataSource) => dataSource.getRepository(UserRole),
//       inject: ['DATA_SOURCE'],
//     },
//   ];

//   export const roleProviders = [
//     {
//       provide: 'ROLE_REPOSITORY',
//       useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
//       inject: ['DATA_SOURCE'],
//     },
//   ];