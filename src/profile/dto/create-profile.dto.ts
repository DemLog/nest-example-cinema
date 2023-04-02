import { IsString, IsNotEmpty, IsEmail, IsOptional, IsNumber } from "class-validator";

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumber()
  age: number;

  @IsString()
  @IsOptional()
  phone?: string;
}