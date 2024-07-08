import { Injectable, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CertificateEntity } from "src/entities/certificate.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { ICertificateRepository } from "src/interfaces/ICertificateRepository";
import { Certificate } from "src/models/certificate.model";
import { FindOneOptions, Repository } from "typeorm";

@Injectable()
export class CertificateRepository extends BaseRepository<CertificateEntity, Repository<CertificateEntity>> implements ICertificateRepository{
    constructor(
        @InjectRepository(CertificateEntity)
        protected readonly repository: Repository<CertificateEntity>
    ){
        super(repository);
    }
    async findRelationById(CertificateID: number): Promise<Certificate> {
        return await this.repository.findOne({where: {CertificateID}, relations: ['usingImages']} as FindOneOptions);
    }

    protected getIdField(): keyof Certificate {
        return  'CertificateID';
    }

    async findAll(): Promise<CertificateEntity[]> {
        return await this.repository.find();
    }

}