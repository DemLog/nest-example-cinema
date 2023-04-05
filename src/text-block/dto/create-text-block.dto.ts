import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateTextBlockDto {
  @ApiProperty({example: 'main-hero-text', description: 'Уникальное имя блока'})
  @IsNotEmpty()
  uniqueName: string;

  @ApiProperty({example: 'Главный блок', description: 'Название блока'})
  @IsNotEmpty()
  name: string;

  @ApiProperty({example: '1', description: 'Изображение'})
  @IsOptional()
  image: string;

  @ApiProperty({example: 'Длинный какой-то текст...', description: 'Текст блока'})
  @IsNotEmpty()
  text: string;

  @ApiProperty({example: 'main-group', description: 'Группа блока'})
  @IsNotEmpty()
  group: string;
}