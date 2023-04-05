import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { TextBlockService } from "./text-block.service";
import { CreateTextBlockDto } from "./dto/create-text-block.dto";
import { Roles } from "../common/decorators/roles.decorator";
import { TextBlock } from "./entities/textBlock.entity";
import { FindTextBlockDto } from "./dto/find-text-block.dto";
import { Public } from "../common/decorators/public.decorator";

@ApiTags("Текстовый блок")
@ApiBearerAuth()
@Controller('text-block')
export class TextBlockController {
  constructor(private readonly textBlockService: TextBlockService) {}

  @ApiOperation({ summary: "Создание текстового блока" })
  @ApiCreatedResponse({ description: "Текстовый блок успешно создан.", type: TextBlock })
  @Roles('admin')
  @Post('')
  async createTextBlock(@Body() createTextBlockDto: CreateTextBlockDto) {
    return this.textBlockService.create(createTextBlockDto);
  }

  @ApiOperation({ summary: "Получить все текстовые блоки с фильтрацией" })
  @ApiCreatedResponse({ description: "ТВсе текстовые блоки получены.", type: [TextBlock] })
  @Public()
  @Get('')
  async getAllWithFilter(@Query() findTextBlockDto: FindTextBlockDto) {

  }


}
