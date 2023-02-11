import { IsEmail, IsMobilePhone, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class UserRegisterDto {
  
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @AutoMap()
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @AutoMap()
  surname: string;

  @ApiProperty()
  @IsEmail()
  @AutoMap()
  email: string;

  @ApiProperty()
  @IsMobilePhone('tr-TR')
  @AutoMap()
  phone: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/(?=.*[a-zA-Z])(?=.*\d)(?=.*[0-9]).{6,}$/, {
    message: 'Password too week',
  })
  @AutoMap()
  password: string;

  @ApiProperty()
  @AutoMap()
  @MinLength(10)
  @MaxLength(11)
  registeryNo: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @AutoMap()
  companyName: string;

  @ApiProperty()
  roleId: number;
}