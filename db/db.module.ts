import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import dataSource from "./data-source";
import { addTransactionalDataSource } from "typeorm-transactional";
import { DataSource } from "typeorm";

@Module({
	imports: [TypeOrmModule.forRootAsync({
        useFactory: () => dataSource.options,
        dataSourceFactory: async (options) =>
            addTransactionalDataSource(new DataSource(options)),
    }),],

})
export class DbModule {}