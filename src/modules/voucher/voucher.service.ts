import { Inject, Injectable } from "@nestjs/common";
import { Voucher } from "src/models/voucher.model";
import { IBillDiscountRepository as IVoucherRepository } from "src/interfaces/IBillDiscountRepository";

@Injectable()
export class  VoucherService {

  constructor(
    @Inject('IVoucherRepository')  
    private readonly voucherRepository: IVoucherRepository 
  ) {}

  async findAll(): Promise<Voucher[]> {
    return (await this.voucherRepository.findAll());
  }

  async findById(id: number): Promise<Voucher> {
    return await this.voucherRepository.findById(id);
  }

  async create(billdiscount: Voucher): Promise<Voucher> {
    return await this.voucherRepository.create(billdiscount);
  }

  async update(id: number, billdiscount:Voucher): Promise<Voucher> {
    await this.voucherRepository.update(id, billdiscount);
    return this.findById(id);
  }

  async delete(id: number): Promise<Voucher> {
    const billdiscount = await this.voucherRepository.findById(id);
    if (!billdiscount) {
        throw new Error('id not found');
    }
        await this.voucherRepository.delete(id);
        return billdiscount;
  }

  async findRelationById(id: number): Promise<Voucher> {
    return await this.voucherRepository.findRelationById(id);
  }
}