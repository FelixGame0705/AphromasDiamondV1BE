import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MaterialJewelryEntity } from "src/entities/marterialJewelry.entity";
import { MaterialJewelryService } from "./materialjewelry.service";
import { MaterialJewelryRepository } from "./materialjewelry.repository";
import { MaterialJewelry } from '../../models/materialjewelry.model';

@Module({
    imports: [TypeOrmModule.forFeature([ MaterialJewelryEntity])],
    controllers: [ MaterialJewelryEntity],
    providers: [MaterialJewelryService, {
        useClass:  MaterialJewelryRepository,
        provide: 'MaterialJewelryRepository'
    }]
})
export class MaterialJewelryModule{

}