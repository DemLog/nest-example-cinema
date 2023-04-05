import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { TextBlock } from "./entities/textBlock.entity";
import { CreateTextBlockDto } from "./dto/create-text-block.dto";
import { FindTextBlockDto } from "./dto/find-text-block.dto";
import { UpdateTextBlockDto } from "./dto/update-text-block.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TextBlockService {
  constructor(@InjectRepository(TextBlock) private textBlockRepository: Repository<TextBlock>) {}

  async create(textBlockData: CreateTextBlockDto): Promise<TextBlock> {
    const textBlock = new TextBlock();
    Object.assign(textBlock, textBlockData);
    return this.textBlockRepository.save(textBlock);
  }

  async findAll(): Promise<TextBlock[]> {
    return this.textBlockRepository.find();
  }

  async findOneById(id: number): Promise<TextBlock> {
    return this.textBlockRepository.findOne({where: {id}})
  }

  async findOneByGroup(findTextBlockData: FindTextBlockDto): Promise<TextBlock> {
    return this.textBlockRepository.findOne({where: { group: findTextBlockData.group}})
  }

  async update(id: number, textBlockData: UpdateTextBlockDto): Promise<void> {
    await this.checkTextBlock(id);
    await this.textBlockRepository.update(id, textBlockData);
  }

  async remove(id: number): Promise<void> {
    await this.checkTextBlock(id);
    await this.textBlockRepository.delete(id);
  }

  private async checkTextBlock(id: number): Promise<boolean> {
    const textBlock = await this.findOneById(id);
    if (!textBlock) {
      throw new HttpException('Текстовый блок не найден.', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}
