import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SizeEntity } from "src/entities/size.entity";
import { SizeController } from "./size.controller";
import { SizeService } from "./size.service";
import { SizeRepository } from "./size.repository";

@Module({
    imports: [TypeOrmModule.forFeature([SizeEntity])],
    controllers: [SizeController],
    providers: [SizeService, {
        useClass: SizeRepository,
        provide: 'ISizeRepository'
    }]
})
export class SizeModule{

}