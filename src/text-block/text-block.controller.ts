import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import {
  ApiBearerAuth, ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { TextBlockService } from "./text-block.service";
import { CreateTextBlockDto } from "./dto/create-text-block.dto";
import { Roles } from "../common/decorators/roles.decorator";
import { TextBlock } from "./entities/textBlock.entity";
import { FindTextBlockDto } from "./dto/find-text-block.dto";
import { Public } from "../common/decorators/public.decorator";
import { UpdateTextBlockDto } from "./dto/update-text-block.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileUploadService } from "../file-upload/file-upload.service";
import { FileUploadDto } from "../file-upload/dto/file-upload.dto";
import { TextBlockDto } from "./dto/text-block.dto";

@ApiTags("Текстовый блок")
@Controller("text-block")
export class TextBlockController {
  constructor(
    private readonly textBlockService: TextBlockService,
    private readonly fileUploadService: FileUploadService
  ) {
  }

  @ApiOperation({ summary: "Создание текстового блока" })
  @ApiCreatedResponse({ description: "Текстовый блок успешно создан.", type: TextBlock })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @Roles("admin")
  @Post("")
  @UseInterceptors(FileInterceptor("image"))
  async createTextBlock(
    @UploadedFile() image: Express.Multer.File,
    @Body() createTextBlockDto: CreateTextBlockDto
  ): Promise<TextBlock> {
    let savedFile;
    if (image) {
      const fileUploadDto: FileUploadDto = { file: image };
      savedFile = await this.fileUploadService.create(fileUploadDto);
    }

    const textBlockDto: TextBlockDto = {
      ...createTextBlockDto,
      image: image ? savedFile.filename : ''
    };
    const textBlock = await this.textBlockService.create(textBlockDto);

    if (image) {
      await this.fileUploadService.updateEssence(savedFile.id, {
        essenceId: textBlock.id,
        essenceTable: "text-block"
      });
    }

    return textBlock;
  }

  @ApiOperation({ summary: "Получить все текстовые блоки с фильтрацией" })
  @ApiCreatedResponse({ description: "Все текстовые блоки получены.", type: [TextBlock] })
  @Public()
  @Get("")
  async getAllWithFilter(@Query() findTextBlockDto: FindTextBlockDto) {
    return Object.entries(findTextBlockDto).length !== 0
      ? this.textBlockService.findAllByGroup(findTextBlockDto)
      : this.textBlockService.findAll();
  }

  @ApiOperation({ summary: "Получить текстовый блок по ID" })
  @ApiCreatedResponse({ description: "Текстовый блок получен.", type: TextBlock })
  @Public()
  @Get(":id")
  async getTextBlock(@Param("id") id: number) {
    return this.textBlockService.findOneById(id);
  }

  @ApiOperation({ summary: "Редактировать текстовый блок" })
  @ApiOkResponse({ description: "Текстовый блок обновлен успешно." })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @Roles("admin")
  @Put(":id")
  @UseInterceptors(FileInterceptor('file'))
  async updateTextBlock(
    @Param('id') id: number,
    @Body() updateTextBlockDto: UpdateTextBlockDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<void> {
    if (file) {
      const fileUploadDto: FileUploadDto = { file: file };
      const savedFile = await this.fileUploadService.create(fileUploadDto);

      // await this.fileUploadService.deleteFile(textBlock.image);

      updateTextBlockDto.image = savedFile.filename;
    }

    await this.textBlockService.update(id, updateTextBlockDto);
  }

  @ApiOperation({ summary: "Удалить текстовый блок" })
  @ApiNoContentResponse({ description: "Текстовый блок был удален." })
  @ApiBearerAuth()
  @Roles("admin")
  @Delete(":id")
  async remove(@Param("id") id: number) {
    return this.textBlockService.remove(id);
  }


}
