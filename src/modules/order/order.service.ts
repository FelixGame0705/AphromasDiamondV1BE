import { Inject, Injectable } from "@nestjs/common";
import { PRODUCT_PER_PAGE } from "src/constants/constant";
import { OrderDTO, PaymentDTO } from "src/dto/order.dto";
import { IOrderRepository } from "src/interfaces/IOrderRepository";
import { Order } from "src/models/order.model";

@Injectable()
export class OrderService{
    constructor(
        @Inject('IOrderRepository')
        private readonly orderRepository:IOrderRepository
    ){

    }
    async findAll():Promise<Order[]> {
        return (await this.orderRepository.findAll()).map(item => new Order(item));
    }
    async findById(id:number):Promise<Order>{
        return await this.orderRepository.findById(id);
    }
    async create(order:OrderDTO):Promise<Order>{
        return await this.orderRepository.create(order);
    }
    async update(id: number, order: OrderDTO): Promise<Order>{
        await this.orderRepository.update(id, order);
        return this.findById(id);
    }

    async payment(id: number): Promise<Order>{
        await this.orderRepository.payOrder(id);
        return this.findById(id);
    }

    async delete(id: number):Promise<boolean>{
        return await this.orderRepository.delete(id);
    }
    async findRelationById(id: number):Promise<Order>{
        return await this.orderRepository.findRelationOrderLineById(id);
    }
    async getOrders(page: number, filters: any, sort: { field: string, order: 'ASC' | 'DESC' }) {
        const perPage = PRODUCT_PER_PAGE;
        return this.orderRepository.paginateAndFilter(page, perPage, filters, sort);
    }
}