import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CollectionEntity } from "src/entities/collection.entity";
import { CollectionController } from "./collection.controller";
import { DiamondService } from "../diamond/diamond.service";
import { CollectionRepository } from "./collection.repository";

@Module({
    imports: [TypeOrmModule.forFeature([CollectionEntity])],
    controllers: [CollectionController],
    providers: [DiamondService, {
        useClass: CollectionRepository,
        provide: 'ICollectionRepository'
    }]
})
export class DiamondModule{

}