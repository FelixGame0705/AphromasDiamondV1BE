import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CertificateEntity } from "src/entities/certificate.entity";
import { CertificateService } from "./certificate.service";
import { CertificateRepository } from "./certificate.repository";
import { CertificateController } from "./certificate.controller";

@Module({
    imports: [TypeOrmModule.forFeature([CertificateEntity])],
    controllers: [CertificateController],
    providers: [CertificateService, {
        useClass: CertificateRepository,
        provide: 'ICertificateRepository'
    }]
})
export class CertificateModule{

}