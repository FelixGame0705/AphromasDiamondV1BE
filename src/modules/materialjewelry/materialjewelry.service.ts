import { Inject, Injectable } from "@nestjs/common";
import { MaterialJewelryRepository } from "src/interfaces/MaterialJewelryRepository";
import { MaterialJewelry } from "src/models/materialjewelry.model";

@Injectable()
export class  MaterialJewelryService {

  constructor(
    @Inject('MaterialJewelryRepository')  
    private readonly MaterialJewelryRepository: MaterialJewelryRepository
  ) {}

  async findAll(): Promise<MaterialJewelry[]> {
    return (await this.MaterialJewelryRepository.findAll());
  }

  async findById(id: number): Promise<MaterialJewelry> {
    return await this.MaterialJewelryRepository.findById(id);
  }

  async create(materialjewelry: MaterialJewelry): Promise<MaterialJewelry> {
    return await this.MaterialJewelryRepository.create(materialjewelry);
  }

  async update(id: number, materialjewelry: MaterialJewelry): Promise<MaterialJewelry> {
    await this.MaterialJewelryRepository.update(id, materialjewelry);
    return this.findById(id);
  }

  async delete(id: number): Promise<MaterialJewelry> {
    const jewelrytype = await this.MaterialJewelryRepository.findById(id);
    if (!jewelrytype) {
        throw new Error('id not found');
    }
        await this.MaterialJewelryRepository.delete(id);
        return jewelrytype;
  }

  async findRelationById(id: number): Promise<MaterialJewelry> {
    return await this.MaterialJewelryRepository.findRelationById(id);
  }
}

 