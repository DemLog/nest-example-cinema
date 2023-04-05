import { DataSource, DataSourceOptions } from "typeorm";
import { Auth } from "../auth/entities/auth.entity";
import { Profile } from "../profile/entities/profile.entity";
import { UserTable1680643376317 } from "../migration/1680643376317-UserTable";
import { TextBlock } from "../text-block/entities/textBlock.entity";
import { TextBlockTable1680685064372 } from "../migration/1680685064372-TextBlockTable";
import { File } from "../file-upload/entities/file.entity";
import { FileUploadTable1680725154762 } from "../migration/1680725154762-FileUploadTable";

export const dataSourceOptions: DataSourceOptions = {
  logging: false,
  entities: [Auth, Profile, TextBlock, File], // временно
  migrationsTableName: 'migration',
  migrations: [UserTable1680643376317, TextBlockTable1680685064372, FileUploadTable1680725154762], // временно
  synchronize: false,
  type: "postgres",
  host: 'localhost',
  port: 32768,
  username: 'dls',
  password: 'test',
  database: 'test'
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;