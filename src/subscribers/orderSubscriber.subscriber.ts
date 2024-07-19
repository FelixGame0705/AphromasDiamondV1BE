import { EventSubscriber, EntitySubscriberInterface, UpdateEvent, InsertEvent, In } from 'typeorm';
import { MaterialJewelryEntity } from 'src/entities/marterialJewelry.entity';
import { JewelrySettingVariantEntity } from 'src/entities/jewlrySettingVariant.entity';
import { ProductEntity } from 'src/entities/products.entity';
import { DiamondEntity } from 'src/entities/diamond.entity';
import { reduce } from 'rxjs';
import { JewelrySettingEntity } from 'src/entities/jewelrySetting.entity';
import { OrderLineEntity } from 'src/entities/orderLine.entity';
import { Transactional } from 'typeorm-transactional';
import { OrderEntity } from 'src/entities/order.entity';
import { VoucherEntity } from 'src/entities/voucher.entity';

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<OrderEntity> {
    private isHandlingUpdate = false;

    /**
     * Chỉ ra rằng Subscriber này chỉ lắng nghe các sự kiện của MaterialJewelryEntity.
     */
    listenTo() {
        return OrderEntity;
    }


    /**
     * Được gọi sau khi cập nhật thực thể.
     */

    @Transactional()
    async afterUpdate(event: UpdateEvent<OrderEntity>) {
        if (this.isHandlingUpdate) {
            return;
        }

        this.isHandlingUpdate = true;
        try {
            // Kiểm tra nếu jewelrySettingVariant đã thay đổi
            //if (event.updatedColumns.some(column => column.propertyName === 'JewelrySettingID')) {
            const order = event.entity;
            console.log("order: ", order)
            if (!order) return;
            // const oldOrderIDinOrderline= event.databaseEntity.OrderID;
            const orderRepository = event.manager.getRepository(OrderEntity)
            const orderlineRepository = event.manager.getRepository(OrderLineEntity)
            const productRepository = event.manager.getRepository(ProductEntity)
            const diamondRepository = event.manager.getRepository(DiamondEntity)
            const voucherRepository = event.manager.getRepository(VoucherEntity)

            const orderEntity = (await orderRepository.findOne({ where: { OrderID: order.OrderID } }))
            const orderlineEntity = await orderlineRepository.find({ where: { OrderID: orderEntity.OrderID } })
            const orderlineDiamondID = orderlineEntity.map(item => item.DiamondID)
            const orderlineProductID = orderlineEntity.map(item => item.ProductID)
            const productEntity = await productRepository.find({ where: { ProductID: In(orderlineProductID) } })
            const diamondEntity = await diamondRepository.find({ where: { DiamondID: In(orderlineDiamondID) } })
            const voucherEntity = await voucherRepository.findOne({where: {VoucherID: orderEntity.VoucherID}})
            const orderVoucherPrice = orderlineEntity.reduce((total, orderline) => {
                // Nếu orderline hoặc orderline.Price là null hoặc undefined, sử dụng giá trị 0
                const price = orderline?.DiscountPrice ?? 0;
                return total + price;
            }, 0);
            orderEntity.Price = orderVoucherPrice;
            orderEntity.VoucherPrice = (Number(voucherEntity.PercentDiscounts) * Number(orderVoucherPrice))/100
            if (orderEntity.OrderStatus === 'Cancel') {
                for (const orderline of orderlineEntity) {
                    const product = productEntity.find(p => p.ProductID === orderline.ProductID);
                    if (product) {
                        product.Quantity -= orderline.Quantity;
                    }

                    const diamond = diamondEntity.find(d => d.DiamondID === orderline.DiamondID);
                    if (diamond) {
                        diamond.Quantity -= orderline.Quantity;
                    }
                }
                await productRepository.save(productEntity);
                await diamondRepository.save(diamondEntity);
            }
            await orderRepository.save(orderEntity)
        } finally {
            this.isHandlingUpdate = false
        }
    }
}