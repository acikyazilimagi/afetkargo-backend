import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  surname: string;

  // TODO - Check REGEX for email
  @ApiProperty()
  @IsString()
  @Matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
  email: string;

  // TODO - Check REGEX for phone number
  @ApiProperty()
  @MaxLength(12)
  @MinLength(12)
  phone: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too week',
  })
  password: string;

  @ApiProperty()
  @MinLength(11)
  @MaxLength(11)
  registeryNo: number;
}
