import { Inject, Injectable } from "@nestjs/common";
import { PRODUCT_PER_PAGE } from "../../constants/constant";
import { OrderLineDTO } from "../../dto/orderline.dto";
import { IOrderLineRepository } from "../../interfaces/IOrderLineRepository";
import { IOrderRepository } from "../../interfaces/IOrderRepository";
import { Order } from "../../models/order.model";
import { OrderLine } from "../../models/orderline.model";

@Injectable()
export class OrderLineService{
    constructor(
        @Inject('IOrderLineRepository')
        private readonly orderRepository:IOrderLineRepository
    ){

    }
    async findAll():Promise<OrderLine[]> {
        return (await this.orderRepository.findAll()).map(item => new OrderLine(item));
    }
    async findById(id:number):Promise<OrderLine>{
        return await this.orderRepository.findById(id);
    }
    async create(order:OrderLineDTO):Promise<OrderLine>{
        return await this.orderRepository.create(order);
    }
    async update(id: number, order: OrderLineDTO): Promise<OrderLine>{
        await this.orderRepository.update(id, order);
        return this.findById(id);
    }
    async delete(id: number):Promise<boolean>{
        return await this.orderRepository.delete(id);
    }
    async findRelationById(id: number):Promise<OrderLine>{
        return await this.orderRepository.findRelationById(id);
    }
    async getOrders(page: number, filters: any, sort: { field: string, order: 'ASC' | 'DESC' }) {
        const perPage = PRODUCT_PER_PAGE;
        return this.orderRepository.paginateAndFilter(page, perPage, filters, sort);
    }
}