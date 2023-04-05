import { Module } from '@nestjs/common';
import { TextBlockController } from './text-block.controller';
import { TextBlockService } from './text-block.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TextBlock } from "./entities/textBlock.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TextBlock])],
  controllers: [TextBlockController],
  providers: [TextBlockService]
})
export class TextBlockModule {}
