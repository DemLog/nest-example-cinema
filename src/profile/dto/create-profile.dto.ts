import { IsString, IsNotEmpty, IsEmail, IsOptional, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProfileDto {
  @ApiProperty({example: 'Василий', description: 'Имя'})
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({example: 'Пупкин', description: 'Фамилия'})
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({example: 'vasya@mail.com', description: 'E-Mail', required: false})
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({example: '25', description: 'Возраст'})
  @IsNumber()
  age: number;

  @ApiProperty({example: '+78005553535', description: 'Телефон', required: false})
  @IsString()
  @IsOptional()
  phone?: string;
}