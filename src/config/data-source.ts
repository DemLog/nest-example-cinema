import { DataSource, DataSourceOptions } from "typeorm";
import { Auth } from "../auth/entities/auth.entity";
import { Profile } from "../profile/entities/profile.entity";
import { UserTable1680643376317 } from "../migration/1680643376317-UserTable";

export const dataSourceOptions: DataSourceOptions = {
  logging: false,
  entities: [Auth, Profile], // временно
  migrationsTableName: 'migration',
  migrations: [UserTable1680643376317], // временно
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