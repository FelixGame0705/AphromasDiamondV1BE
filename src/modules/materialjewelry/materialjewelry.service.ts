import { Inject, Injectable } from "@nestjs/common";
import { IMaterialJewelryRepository } from "src/interfaces/IMaterialJewelryRepository";
import { MaterialJewelry } from "src/models/materialjewelry.model";

@Injectable()
export class  MaterialJewelryService {

  constructor(
    @Inject('IMaterialJewelryRepository')  
    private readonly MaterialJewelryRepository: IMaterialJewelryRepository
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
    const materialjewelry = await this.MaterialJewelryRepository.findById(id);
    if (!materialjewelry) {
        throw new Error('id not found');
    }
        await this.MaterialJewelryRepository.delete(id);
        return materialjewelry;
  }

  async findRelationById(id: number): Promise<MaterialJewelry> {
    return await this.MaterialJewelryRepository.findRelationById(id);
  }
}

 