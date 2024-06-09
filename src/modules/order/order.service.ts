import { Inject, Injectable } from "@nestjs/common";
import { PRODUCT_PER_PAGE } from "src/constants/constant";
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
    async create(order:Order):Promise<Order>{
        return await this.orderRepository.create(order);
    }
    async update(id: number, order: Order): Promise<Order>{
        await this.orderRepository.update(id, order);
        return this.findById(id);
    }
    async delete(id: number):Promise<boolean>{
        return await this.orderRepository.delete(id);
    }
    async findRelationById(id: number):Promise<Order>{
        return await this.orderRepository.findRelationById(id);
    }
    async getOrders(page: number, filters: any, sort: { field: string, order: 'ASC' | 'DESC' }) {
        const perPage = PRODUCT_PER_PAGE;
        return this.orderRepository.paginateAndFilter(page, perPage, filters, sort);
    }
}