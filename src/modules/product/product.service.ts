import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/interfaces/IProductRepository';
import { Product } from 'src/models/product.model';
@Injectable()
export class ProductService {

  constructor(
    @Inject('IProductRepository')  
    private readonly ProductRepository: IProductRepository
  ) {}

  async findAll(): Promise<Product[]> {
    return (await this.ProductRepository.findAll());
  }

  async findById(id: number): Promise<Product> {
    return await this.ProductRepository.findById(id);
  }

  async create(Product: Product): Promise<Product> {
    return await this.ProductRepository.create(Product);
  }

  async update(id: number, Product: Product): Promise<Product> {
    await this.ProductRepository.update(id, Product);
    return this.findById(id);
  }

  async delete(id: number): Promise<Product> {
    const Product = await this.ProductRepository.findById(id);
    if (!Product) {
        throw new Error('Product not found');
    }
        await this.ProductRepository.delete(id);
        return Product;
  }

  async findRelationById(id: number): Promise<Product> {
    return await this.ProductRepository.findRelationProducById(id);
  }
}

 