import { Inject, Injectable } from "@nestjs/common";
import { IJewelryTypeRepository } from "src/interfaces/IJewelryTypeRepository";
import { JewelryType } from "src/models/jewelryType.model";


@Injectable()
export class JewelryTypeService {

  constructor(
    @Inject('IJewelryTypeRepository')  
    private readonly JewelryTypeRepository: IJewelryTypeRepository
  ) {}

  async findAll(): Promise<JewelryType[]> {
    return (await this.JewelryTypeRepository.findAll());
  }

  async findById(id: number): Promise<JewelryType> {
    return await this.JewelryTypeRepository.findById(id);
  }

  async create(jewelrytype: JewelryType): Promise<JewelryType> {
    return await this.JewelryTypeRepository.create(jewelrytype);
  }

  async update(id: number, jewelrytype: JewelryType): Promise<JewelryType> {
    await this.JewelryTypeRepository.update(id, jewelrytype);
    return this.findById(id);
  }

  async delete(id: number): Promise<JewelryType> {
    const jewelrytype = await this.JewelryTypeRepository.findById(id);
    if (!jewelrytype) {
        throw new Error('id not found');
    }
        await this.JewelryTypeRepository.delete(id);
        return jewelrytype;
  }

  async findRelationById(id: number): Promise<JewelryType> {
    return await this.JewelryTypeRepository.findRelationById(id);
  }
}

 