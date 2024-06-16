import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CertificateEntity } from "src/entities/certificate.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { ICertificateRepository } from "src/interfaces/ICertificateRepository";
import { Certificate } from "src/models/certificate.model";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class CertificateRepository extends BaseRepository<CertificateEntity, Repository<CertificateEntity>> implements ICertificateRepository{
    constructor(
        @InjectRepository(CertificateEntity)
        protected readonly repository: Repository<CertificateEntity>
    ){
        super(repository);
    }
    findRelationById(id: number): Promise<Certificate> {
        return null;
    }ư

    protected getIdField(): keyof Certificate {
        return 'CerID';
    }

    async findAll(): Promise<CertificateEntity[]> {
        return await this.repository.find();
    }

}