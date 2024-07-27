import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDTO, OrderSummarizeDTO, PaymentDTO } from "src/dto/order.dto";
import { DiamondEntity } from "src/entities/diamond.entity";
import { JewelrySettingVariantEntity } from "src/entities/jewlrySettingVariant.entity";
import { OrderEntity } from "src/entities/order.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IOrderRepository } from "src/interfaces/IOrderRepository";
import { Order, OrderSummarize } from "src/models/order.model";
import { Between, DataSource, EntityManager, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual, ObjectLiteral, Repository, getManager } from "typeorm";
import { Transactional } from "typeorm-transactional";
import * as moment from 'moment';

@Injectable()
export class OrderRepository extends BaseRepository<OrderEntity, Repository<OrderEntity>> implements IOrderRepository {

    constructor(
        @InjectRepository(OrderEntity)
        protected readonly repository: Repository<OrderEntity>
    ) {
        super(repository);
    }
    async summarizeOrder(orderSummarize: OrderSummarizeDTO): Promise<OrderSummarize> {
            const whereConditions: any = {};
            if (orderSummarize.StartDate && orderSummarize.EndDate) {
                whereConditions['CompleteDate'] = Between(orderSummarize.StartDate, orderSummarize.EndDate);
            }
        
            // Truy vấn dữ liệu từ repository
            const data = await this.repository.find({ where: whereConditions });
        
            const monthlyData: { [month: string]: { revenue: number, orderQuantity: number } } = {};
        
            // Duyệt qua dữ liệu và tính tổng doanh thu và số lượng đơn hàng theo từng tháng
            data.forEach(order => {
                const month = moment(order.CompleteDate).format('YYYY-MM'); // Định dạng tháng (năm-tháng)
                if (!monthlyData[month]) {
                    monthlyData[month] = { revenue: 0, orderQuantity: 0 };
                }
                monthlyData[month].revenue += Number(order.VoucherPrice) || Number(order.Price); // Giả sử `order.Revenue` là trường chứa doanh thu của đơn hàng
                monthlyData[month].orderQuantity += 1;
            });
            const monthlyArray = Object.keys(monthlyData).map(month => ({
                month,
                revenue: monthlyData[month].revenue,
                orderQuantity: monthlyData[month].orderQuantity
            }));
            
            const mostRevenueInTime = monthlyArray.reduce((max, current) => {
                return current.revenue > max.revenue ? current : max;
            }, { month: '', revenue: 0, orderQuantity: 0 });

            const mostQuantityInTime = monthlyArray.reduce((max, current) => {
                return current.orderQuantity > max.orderQuantity ? current : max;
            }, { month: '', revenue: 0, orderQuantity: 0 });
        
        
            // Chuyển đổi đối tượng thành mảng kết quả
            const result = new OrderSummarize({
                StartDate: orderSummarize.StartDate,
                EndDate: orderSummarize.EndDate,
                MostRevenueInTime: mostRevenueInTime,
                MostQuantiyInTime: mostQuantityInTime,
                OrderResults: Object.keys(monthlyData).map(month => ({
                month,
                revenue: monthlyData[month].revenue,
                orderQuantity: monthlyData[month].orderQuantity
            }))
     } );
        
            return result;
    }
    @Transactional()
    async payOrder(id: number): Promise<Order> {
        const manager = this.repository.manager
        const order = await this.findRelationOrderLineById(id);
        const diamondsToUpdate = order.OrderLines.map(orderLine => orderLine.DiamondID);
        const jewelrySettingToUpdate = order.OrderLines.map(orderLine => orderLine.product.jewelrySetting.JewelrySettingVariantID);
        if (diamondsToUpdate != null)
            await manager
                .createQueryBuilder()
                .update(DiamondEntity)
                .set({ IsActive: false })
                .whereInIds(diamondsToUpdate)
                .execute();
        if (jewelrySettingToUpdate != null)
            for (const variantId of jewelrySettingToUpdate) {
                await manager
                    .createQueryBuilder()
                    .update(JewelrySettingVariantEntity)
                    .set({ Quantity: () => "Quantity - 1" }) // Sử dụng chức năng giảm 1 đơn vị
                    .where("JewelrySettingVariantID = :id", { id: variantId })
                    .execute();
            }
        order.IsPayed = true;
        await manager.save(OrderEntity, order);
        return this.findRelationOrderLineById(id);
        // async (manager: EntityManager) => {
        //     const order = await this.findRelationOrderLineById(id);
        //     const diamondsToUpdate = order.OrderLines.map(orderLine => orderLine);
        //     console.error("Diamond up aaaaaaaaa" + diamondsToUpdate)
        //     await manager
        //         .createQueryBuilder()
        //         .update(DiamondEntity)
        //         .set({ IsActive: false })
        //         .whereInIds(diamondsToUpdate)
        //         .execute();

        //     order.OrderStatus = 'Complete';
        //     await manager.save(OrderEntity, order);


        // }
        // return this.findRelationOrderLineById(id);
    }
    async paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, order: 'ASC' | 'DESC' }
    ): Promise<{ data: OrderEntity[], total: number, page: number, last_page: number }> {
        const builder = this.repository.createQueryBuilder('order');

        // Apply filters
        if (filters.Status) {
            builder.andWhere("order.Status LIKE :Status", { Status: `${filters.Status}` });
        }

        // Apply sorting
        if (sort && sort.field && sort.order) {
            builder.orderBy(`order.${sort.field}`, sort.order);
        }

        // Get total count
        const total = await builder.getCount();

        // Apply pagination
        builder.offset((page - 1) * perPage).limit(perPage);

        // Get data
        const data = await builder.getMany();

        return {
            data,
            total,
            page,
            last_page: Math.ceil(total / perPage)
        };
    }

    protected getIdField(): keyof OrderEntity {
        return "OrderID";
    }
    async update(id: number, data: OrderDTO): Promise<OrderEntity> {
        await this.repository.update(id, {
            OrderDate: data.OrderDate,
            CompleteDate: data.CompleteDate,
            IsPayed: data.IsPayed,
            Shippingfee: data.Shippingfee,
            ReasonReturn: data.ReasonReturn,
            Note: data.Note,
            CustomerID: data.CustomerID,
            OrderStatus: data.OrderStatus,
            IsActive: data.IsActive,
            AccountDeliveryID: data.AccountDeliveryID,
            AccountSaleID: data.AccountSaleID,
            VoucherID: data.VoucherID,
            NameReceived: data.NameReceived,
            PhoneNumber: data.PhoneNumber,
            Email: data.Email,
            Address: data.Address
        })
        return this.findById(id);
    }
    async findRelationOrderLineById(id: number): Promise<any> {
        // const [orderWithOrderLine, orderWithAccountDelivery] = await Promise.all([
        //     this.repository.findOne({ where: { OrderID: id }, relations: ['orderLine'] }),
        //     this.repository.findOne({ where: { OrderID: id }, relations: ['accountDelivery'] })
        // ]);

        // if (orderWithOrderLine && orderWithAccountDelivery) {
        //     return {
        //         ...orderWithOrderLine,
        //         accountDelivery: orderWithAccountDelivery.accountDelivery,
        //     } as Order;
        // }

        //return orderWithOrderLine || orderWithAccountDelivery;

        const orderDetail = await this.repository.findOne({ where: { OrderID: id }, relations: ['orderLine', 'customer', 'orderLine.diamond', 'orderLine.product'] })
        // const order = await this.repository.createQueryBuilder('order')
        //     .leftJoinAndSelect('order.accountDelivery', 'account')
        //     .leftJoinAndSelect('order.orderLine', 'orderline')
        //     .leftJoinAndSelect('orderline.diamond', 'diamond')
        //     .select([
        //         'order.OrderID',
        //         'order.OrderDate',
        //         'order.CompleteDate',
        //         'order.OrderStatus',
        //         'order.NameReceived',
        //         'order.PaymentID',
        //         'order.Address',
        //         'order.PhoneNumber',
        //         'order.Email',
        //         'account.Name',
        //         'account.PhoneNumber',
        //         'orderline.OrderLineID',
        //         'diamond.Price'
        //     ])
        //     .where('order.OrderID = :id', { id })
        //     .getRawMany();

        // if (order.length === 0) {
        //     return null; // or throw an error if the order is not found
        // }

        // Truy vấn phụ để tính tổng giá trị của các viên kim cương
        // const totalPriceResult = await this.repository.createQueryBuilder('order')
        //     .leftJoin('order.orderLine', 'orderline')
        //     .leftJoin('orderline.diamond', 'diamond')
        //     .select('SUM(diamond.Price)', 'totalPrice')
        //     .where('order.OrderID = :id', { id })
        //     .getRawOne();
        // const totalPriceProductResult = await this.repository.createQueryBuilder('order')
        //     .leftJoin('order.orderLine', 'orderline')
        //     .leftJoin('orderline.product', 'product')
        //     .select('SUM(product.Price)', 'totalPrice')
        //     .where('order.OrderID = :id', { id })
        //     .getRawOne();
        //const totalPrice = totalPriceResult.totalPrice + totalPriceProductResult;

        // Chuẩn bị dữ liệu trả về
        // const response = {
        //     OrderID: order[0].order_OrderID,
        //     OrderDate: order[0].order_OrderDate,
        //     CompleteDate: order[0].order_CompleteDate,
        //     OrderStatus: order[0].order_OrderStatus,
        //     AccountName: order[0].account_Name,
        //     NameReceived: order[0].order_NameReceived,
        //     PaymentID: order[0].order_PaymentID,
        //     Address: order[0].order_Address,
        //     PhoneNumber: order[0].order_PhoneNumber,
        //     Email: order[0].order_Email,
        //     AccountPhoneNumber: order[0].account_PhoneNumber,
        //     OrderLines: order.map(item => ({
        //         OrderLineID: item.orderline_OrderLineID,
        //         DiamondPrice: item.diamond_Price,
        //         ProductPrice: item.product_Price
        //     })),
        //     TotalPrice: totalPrice
        // };

        return {
            ...orderDetail,
            TotalPrice: orderDetail.Price
        }
    }

}