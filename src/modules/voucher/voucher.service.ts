import { Inject, Injectable } from "@nestjs/common";
import { BillDiscount } from "src/models/billdiscount.model";
import { IBillDiscountRepository } from "src/interfaces/IBillDiscountRepository";

@Injectable()
export class  BillDiscountService {

  constructor(
    @Inject('IBillDiscountRepository')  
    private readonly billDiscountRepository: IBillDiscountRepository 
  ) {}

  async findAll(): Promise<BillDiscount[]> {
    return (await this.billDiscountRepository.findAll());
  }

  async findById(id: number): Promise<BillDiscount> {
    return await this.billDiscountRepository.findById(id);
  }

  async create(billdiscount: BillDiscount): Promise<BillDiscount> {
    return await this.billDiscountRepository.create(billdiscount);
  }

  async update(id: number, billdiscount:BillDiscount): Promise<BillDiscount> {
    await this.billDiscountRepository.update(id, billdiscount);
    return this.findById(id);
  }

  async delete(id: number): Promise<BillDiscount> {
    const billdiscount = await this.billDiscountRepository.findById(id);
    if (!billdiscount) {
        throw new Error('id not found');
    }
        await this.billDiscountRepository.delete(id);
        return billdiscount;
  }

  async findRelationById(id: number): Promise<BillDiscount> {
    return await this.billDiscountRepository.findRelationById(id);
  }
}