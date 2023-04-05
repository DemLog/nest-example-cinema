import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class FindTextBlockDto {
  @ApiProperty({example: 'main-group', description: 'Группа блока'})
  @IsNotEmpty()
  group: string;
}