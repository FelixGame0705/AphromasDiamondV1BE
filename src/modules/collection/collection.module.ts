import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CollectionEntity } from "src/entities/collection.entity";
import { CollectionController } from "./collection.controller";
import { CollectionRepository } from "./collection.repository";
import { CollectionService } from "./collection.service";

@Module({
    imports: [TypeOrmModule.forFeature([CollectionEntity])],
    controllers: [CollectionController],
    providers: [CollectionService, {
        useClass: CollectionRepository,
        provide: 'ICollectionRepository'
    }]
})
export class CollectionModule{

}