import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, Repository } from "typeorm";
import { File } from "./entities/file.entity";
import { FileUploadDto } from "./dto/file-upload.dto";
import * as uuid from 'uuid';
import { FileUpdateEssenceDto } from "./dto/file-update-essence.dto";
import * as path from "path";
import * as fs from "fs";
import { UnusedFilesRemoveDto } from "./dto/unused-files-remove.dto";

@Injectable()
export class FileUploadService {
  constructor(@InjectRepository(File) private fileRepository: Repository<File>) {}

  async create(fileUpload: FileUploadDto): Promise<File> {
    const { originalname, mimetype, buffer } = fileUpload.file;

    const file = new File();
    file.filename = uuid.v4() + '.' + originalname.split('.').pop();
    file.originalname = originalname;
    file.mimetype = mimetype;
    file.size = buffer.length;
    file.createdAt = new Date();

    const uploadDir = path.join(__dirname, '..', 'file-upload', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.filename);
    fs.writeFileSync(filePath, buffer);

    return this.fileRepository.save(file);
  }

  async updateEssence(id: number, fileEssenceData: FileUpdateEssenceDto): Promise<File> {
    const file: File = await this.fileRepository.findOne({where: {id}});
    file.essenceTable = fileEssenceData.essenceTable;
    file.essenceId = fileEssenceData.essenceId;
    await this.fileRepository.update(id, fileEssenceData)
    return file;
  }

  async deleteUnusedFiles(): Promise<UnusedFilesRemoveDto> {
    const files = await this.fileRepository.find({
      where: {
        essenceId: null,
        createdAt: LessThan(new Date(new Date().getTime() - 60 * 60 * 1000)),
      },
    });
    for (const file of files) {
      const filePath = path.join(__dirname, '..', 'file-upload', 'uploads', file.filename);
      await fs.promises.unlink(filePath);
      await this.fileRepository.delete(file.id);
    }

    return {count: files.length, message: `Всего было удалено: ${files.length} файл(ов)`}
  }
}
