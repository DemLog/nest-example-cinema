import { PartialType } from "@nestjs/swagger";
import { TextBlockDto } from "./text-block.dto";

export class UpdateTextBlockDto extends PartialType(TextBlockDto) {}