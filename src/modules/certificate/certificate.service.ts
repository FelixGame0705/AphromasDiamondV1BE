import { Inject, Injectable } from "@nestjs/common";
import { ICertificateRepository } from "src/interfaces/ICertificateRepository";
import { Certificate } from "src/models/certificate.model";

@Injectable()
export class CertificateService {
  constructor(
    @Inject('ICertificateRepository')
    private readonly certificateRepository: ICertificateRepository
  ) { }

  async findAll(): Promise<Certificate[]> {
    return (await this.certificateRepository.findAll());
  }

  async findById(id: number): Promise<Certificate> {
    return await this.certificateRepository.findById(id);
  }

  async create(certificate: Certificate): Promise<Certificate> {
    return await this.certificateRepository.create(certificate);
  }

  async update(id: number, certificate: Certificate): Promise<Certificate> {
    await this.certificateRepository.update(id, certificate);
    return this.findById(id);
  }

  async delete(id: number): Promise<Certificate> {
    const certification = await this.certificateRepository.findById(id);
    if (!certification) {
      throw new Error('Certificate not found');
    }
    await this.certificateRepository.delete(id);
    return certification;
  }

  async findRelationById(id: number): Promise<Certificate> {
    return await this.certificateRepository.findRelationById(id);
  }
}