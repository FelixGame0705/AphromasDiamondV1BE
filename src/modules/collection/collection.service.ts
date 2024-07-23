import { Inject, Injectable } from "@nestjs/common";
import { Collection, CollectionAll } from "src/models/collection.model";
import { ICollectionRepository } from "src/interfaces/ICollectionRepository";
import { CollectionDTO } from "src/dto/collection.dto";

@Injectable()
export class  CollectionService {

  constructor(
    @Inject('ICollectionRepository')  
    private readonly collectionRepository: ICollectionRepository
  ) {}

  async findAll(): Promise<Collection[]> {
    return (await this.collectionRepository.findAll());
  }

  async findById(id: number): Promise<Collection> {
    return await this.collectionRepository.findById(id);
  }

  async findRelationById(id: number): Promise<CollectionAll>{
    return await this.collectionRepository.findRelationById(id);
  }

  async create(collection: CollectionDTO): Promise<Collection> {
    let collectionResult = await this.collectionRepository.create(collection);
    return new Collection({
        CollectionID: collectionResult.CollectionID,
        CollectionName: collectionResult.CollectionName,
        Description: collectionResult.Description,
        DebutTime: collectionResult.DebutTime
    })
  }

  async update(id: number, collection: CollectionDTO): Promise<Collection> {
    await this.collectionRepository.update(id, collection);
    return this.findById(id);
  }

  async delete(id: number): Promise<Collection> {
    const Collection = await this.collectionRepository.findById(id);
    if (!Collection) {
        throw new Error('id not found');
    }
        await this.collectionRepository.delete(id);
        return Collection;
  }
  

}

 