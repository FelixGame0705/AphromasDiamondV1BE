import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MaterialJewelryEntity } from "src/entities/marterialJewelry.entity";
import { MaterialJewelryService } from "./materialjewelry.service";
import { MaterialJewelryRepository } from "./materialjewelry.repository";
import { MaterialJewelryController } from "./materialjewelry.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ MaterialJewelryEntity])],
    controllers: [ MaterialJewelryController],
    providers: [MaterialJewelryService, {
        useClass:  MaterialJewelryRepository,
        provide: 'IMaterialJewelryRepository'
    }]
})
export class MaterialJewelryModule{

}