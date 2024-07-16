import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { config } from "dotenv";
import { from } from 'rxjs';
config()

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: true,
  entities: ['dist/**/*.entity.{js,ts}'],
  migrations: ['dist/db/migrations/*.{js,ts}'],
  synchronize: false,
  migrationsTableName: 'migrations',
  migrationsRun: true,
  seeds: ['dist/db/seeds/*.{js,ts}'], // Đảm bảo đúng đường dẫn
  factories: ['dist/db/factories/*.{js,ts}'], // Đường dẫn đến factories nếu có
  subscribers: ['dist/src/subscribers/*.{js,ts}']
};


const dataSource = new DataSource(dataSourceOptions);
export default dataSource;