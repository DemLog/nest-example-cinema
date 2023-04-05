import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({example: 'loginuser', description: 'Логин'})
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({example: 'passworduser', description: 'Пароль'})
  @IsString()
  @IsNotEmpty()
  password: string;
}