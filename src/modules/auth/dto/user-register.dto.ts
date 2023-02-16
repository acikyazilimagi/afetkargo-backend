import { IsEmail, IsMobilePhone, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
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
  @IsString()
  @IsOptional()
  @MaxLength(50)
  @AutoMap()
  companyName: string;

  @ApiProperty()
  roleId: number;
}
