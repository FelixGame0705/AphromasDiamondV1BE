import { Inject, Injectable } from "@nestjs/common";
import { Collection } from "src/models/collection.model";
import { CollectionRepository } from "./Collection.repository";
import { ICollectionRepository } from "src/interfaces/ICollectionRepository";
import { CollectionDTO } from "src/dto/collection.dto";
import { PRODUCT_PER_PAGE } from "src/constants/constant";

@Injectable()
export class  CollectionService {

  constructor(
    @Inject('CollectionRepository')  
    private readonly CollectionRepository: ICollectionRepository
  ) {}

  async findAll(): Promise<Collection[]> {
    return (await this.CollectionRepository.findAll());
  }

  async findById(id: number): Promise<Collection> {
    return await this.CollectionRepository.findById(id);
  }

  async create(collection: CollectionDTO): Promise<Collection> {
    let collectionResult = await this.CollectionRepository.create(collection);
    return new Collection({
        CollectionID: collectionResult.CollectionID,
        CollectionName: collectionResult.CollectionName,
        Description: collectionResult.Description,
        DebutTime: collectionResult.DebutTime
    })
  }

  async update(id: number, collection: CollectionDTO): Promise<Collection> {
    await this.CollectionRepository.update(id, collection);
    return this.findById(id);
  }

  async delete(id: number): Promise<Collection> {
    const Collection = await this.CollectionRepository.findById(id);
    if (!Collection) {
        throw new Error('id not found');
    }
        await this.CollectionRepository.delete(id);
        return Collection;
  }
  

}

 