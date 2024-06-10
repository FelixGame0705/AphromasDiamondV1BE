import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from "dotenv";
config()

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: 'rootpassword',//process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: true,
  migrationsTableName: 'migrations',
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;