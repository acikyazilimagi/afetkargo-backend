import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  
  @ApiProperty()
  userId: string;

  @ApiProperty({example: 'John'})
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({example: 'Doe'})
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  surname: string;

  @ApiProperty({example: '902345678078'})
  @MaxLength(12)
  @MinLength(12)
  phone: string;

}
