import { EventSubscriber, EntitySubscriberInterface, UpdateEvent, InsertEvent, Or } from 'typeorm';
import { MaterialJewelryEntity } from 'src/entities/marterialJewelry.entity';
import { JewelrySettingVariantEntity } from 'src/entities/jewlrySettingVariant.entity';
import { ProductEntity } from 'src/entities/products.entity';
import { DiamondEntity } from 'src/entities/diamond.entity';
import { reduce } from 'rxjs';
import { JewelrySettingEntity } from 'src/entities/jewelrySetting.entity';
import { OrderLineEntity } from 'src/entities/orderLine.entity';
import { Transactional } from 'typeorm-transactional';
import { OrderEntity } from 'src/entities/order.entity';

@EventSubscriber()
export class OrderlineSubscriber implements EntitySubscriberInterface<OrderLineEntity> {
    private isHandlingUpdate = false;
    private oldOrderIDinOrderline = null;
    /**
     * Chỉ ra rằng Subscriber này chỉ lắng nghe các sự kiện của MaterialJewelryEntity.
     */
    listenTo() {
        return OrderLineEntity;
    }


    /**
     * Được gọi sau khi cập nhật thực thể.
     */
    @Transactional()
    async afterInsert(event: InsertEvent<OrderLineEntity>) {
        if (this.isHandlingUpdate) {
            return;
        }

        this.isHandlingUpdate = true;
        try {
            // Kiểm tra nếu jewelrySettingVariant đã thay đổi
            //if (event.updatedColumns.some(column => column.propertyName === 'JewelrySettingID')) {
            const orderline = event.entity;
            console.log("orderline: ", orderline)
            if (!orderline) return;
            const orderlineRepository = event.manager.getRepository(OrderLineEntity)
            const orderlineEntity = (await orderlineRepository.findOne({ where: [{ OrderLineID: orderline.OrderLineID }] }))

            if (orderlineEntity.DiamondID != null || orderlineEntity.ProductID != null) {

                // const productRepository = event.manager.getRepository(ProductEntity)
                const productRepository = event.manager.getRepository(ProductEntity);
                const diamondRepository = event.manager.getRepository(DiamondEntity);
                const orderRepository = event.manager.getRepository(OrderEntity);
                const jewelrySettingVariantRepository = event.manager.getRepository(JewelrySettingVariantEntity);

                // Cập nhật giá của tất cả orderline dựa trên giá bán mới
                const productEntity = await productRepository.findOne({ where: { ProductID: orderlineEntity.ProductID }, relations: ['discount','diamonds'] });
                const diamondEntity = await diamondRepository.findOne({ where: { DiamondID: orderlineEntity.DiamondID } });
                const orderEntity = await orderRepository.findOne({ where: { OrderID: orderlineEntity.OrderID } });
                // for (const item of jewelrySettingVariants) {
                // Logic cập nhật giá trang sức
                //const diamondsInProduct = diamond.map(diamond => diamond.Price*diamond.ChargeRate);
                //const diamondsPrice = diamondsInProduct.reduce((a, p) => a + p)
                if (orderlineEntity.ProductID != null || orderlineEntity.JewelrySettingVariantID != null) {
                    const jewelrySettingVariantEntity = await jewelrySettingVariantRepository.findOne({where: {JewelrySettingVariantID: orderlineEntity.JewelrySettingVariantID}})
                   console.log('Jewelry setting variant price is: ',productEntity.diamonds.map((item) => item.DiscountPrice).reduce((result, current)=>result+current,0))
                    orderlineEntity.Price = (jewelrySettingVariantEntity.Price + productEntity.diamonds.map((item) => item.DiscountPrice).reduce((result, current)=>Number(result)+Number(current),0)) * orderlineEntity.Quantity;
                    orderlineEntity.DiscountPrice = orderlineEntity.Quantity * (jewelrySettingVariantEntity.Price + productEntity.diamonds.map((item) => item.DiscountPrice).reduce((result, current)=>Number(result)+Number(current),0)) * (100-productEntity.discount.PercentDiscounts)/100;
                    orderlineEntity.DiamondID = null
                    if (orderlineEntity.OrderID != null && orderlineEntity.Quantity <= productEntity.Quantity) {
                        productEntity.Quantity -= orderlineEntity.Quantity;
                    }
                    await productRepository.save(productEntity)

                } else if (orderlineEntity.DiamondID != null) {
                    orderlineEntity.Price = diamondEntity.Price * orderline.Quantity;
                    orderlineEntity.DiscountPrice = diamondEntity.DiscountPrice * orderline.Quantity;
                    orderlineEntity.ProductID = null
                    if (orderlineEntity.OrderID != null) {
                        diamondEntity.Quantity = 0;
                    }
                    else {
                        diamondEntity.Quantity = 1;
                    }
                    await diamondRepository.save(diamondEntity)
                }
                if (orderEntity) {
                    const orderlinesEntity = await orderlineRepository.find({ where: { OrderID: orderEntity.OrderID } });
                    const totalDiscountPrice = orderlinesEntity.reduce((total, orderline) => total + orderline.DiscountPrice, 0);
                    orderEntity.Price = totalDiscountPrice;
                    await orderRepository.save(orderEntity);
                }
                console.log('order entity price: ', orderlineEntity)

                await orderlineRepository.save(orderlineEntity);
                // await jewelrySettingVariantRepository.save(item);
                // }
                console.log('Cập nhật hoàn tất.');
            }
            else {
                const orderlineRepository = event.manager.getRepository(OrderLineEntity)
                orderlineEntity.Price = null;
                await orderlineRepository.save(orderlineEntity);

            }
        } finally {
            this.isHandlingUpdate = false
        }
    }

    async beforeUpdate(event: UpdateEvent<OrderLineEntity>) {
        if (this.isHandlingUpdate) {
            return;
        }

        this.isHandlingUpdate = true;
        try {
            // Kiểm tra nếu jewelrySettingVariant đã thay đổi
            //if (event.updatedColumns.some(column => column.propertyName === 'JewelrySettingID')) {
            const orderline = event.entity;
            console.log("orderline before update: ", orderline)
            const orderlineRepository = event.manager.getRepository(OrderLineEntity)
            if (!orderline) return;
            const orderlineEntity = (await orderlineRepository.findOne({ where: [{ OrderLineID: orderline.OrderLineID }] }))
            console.log('orderline entity: ', orderlineEntity)
            if (orderlineEntity?.OrderID != null) {
                this.oldOrderIDinOrderline = orderlineEntity.OrderID
            }
        }
        finally {
            this.isHandlingUpdate = false
        } if (this.isHandlingUpdate) {
            return;
        }

        this.isHandlingUpdate = true;
        try {
            // Kiểm tra nếu jewelrySettingVariant đã thay đổi
            //if (event.updatedColumns.some(column => column.propertyName === 'JewelrySettingID')) {
            const orderline = event.entity;
            console.log("orderline before update: ", orderline)
            const orderlineRepository = event.manager.getRepository(OrderLineEntity)
            if (!orderline) return;
            const orderlineEntity = (await orderlineRepository.findOne({ where: [{ OrderLineID: orderline.OrderLineID }] }))
            console.log('orderline entity: ', orderlineEntity)
            if (orderlineEntity?.OrderID != null) {
                this.oldOrderIDinOrderline = orderlineEntity.OrderID
            }
        }
        finally {
            this.isHandlingUpdate = false
        }
    }
    @Transactional()
    async afterUpdate(event: UpdateEvent<OrderLineEntity>) {
        if (this.isHandlingUpdate) {
            return;
        }

        this.isHandlingUpdate = true;
        try {
            // Kiểm tra nếu jewelrySettingVariant đã thay đổi
            //if (event.updatedColumns.some(column => column.propertyName === 'JewelrySettingID')) {
            const orderline = event.entity;
            console.log("orderline after update: ", orderline)
            if (!orderline) return;
            console.log('Old orderline: ' + event.databaseEntity)
            const orderlineRepository = event.manager.getRepository(OrderLineEntity)
            const orderRepository = event.manager.getRepository(OrderEntity)
            const orderlineEntity = (await orderlineRepository.findOne({ where: { OrderLineID: orderline.OrderLineID } }))
            const orderEntity = await orderRepository.findOne({ where: { OrderID: orderlineEntity.OrderID } })

            if (orderlineEntity.DiamondID != null || orderlineEntity.ProductID != null) {
                // const productRepository = event.manager.getRepository(ProductEntity)
                const productRepository = event.manager.getRepository(ProductEntity);
                const diamondRepository = event.manager.getRepository(DiamondEntity);
                const jewelrySettingVariantRepository = event.manager.getRepository(JewelrySettingVariantEntity)
                // Cập nhật giá của tất cả orderline dựa trên giá bán mới
                const productEntity = await productRepository.findOne({ where: { ProductID: orderlineEntity.ProductID }, relations:['discount','diamonds'] });
                const diamondEntity = await diamondRepository.findOne({ where: { DiamondID: orderlineEntity.DiamondID } });
                
                // for (const item of jewelrySettingVariants) {
                // Logic cập nhật giá trang sức
                //const diamondsInProduct = diamond.map(diamond => diamond.Price*diamond.ChargeRate);
                //const diamondsPrice = diamondsInProduct.reduce((a, p) => a + p)
                if (orderlineEntity.ProductID != null && orderlineEntity.JewelrySettingVariantID != null) {
                    const jewelrySettingVariantEntity = await jewelrySettingVariantRepository.findOne({ where: { JewelrySettingVariantID: orderlineEntity.JewelrySettingVariantID }})
                    
                    console.log('Jewelry setting variant price ', jewelrySettingVariantEntity.Price)
                    orderlineEntity.Price = jewelrySettingVariantEntity.Price + productEntity.diamonds.map((item) => item.DiscountPrice).reduce((result, current)=>Number(result)+Number(current),0)
                    orderlineEntity.DiscountPrice = (jewelrySettingVariantEntity.Price + productEntity.diamonds.map((item) => item.DiscountPrice).reduce((result, current)=>Number(result)+Number(current),0)) * (100-productEntity.discount.PercentDiscounts)/100;
                    orderlineEntity.DiamondID = null
                    if (orderlineEntity.OrderID != null && orderlineEntity.Quantity <= productEntity.Quantity) {
                        productEntity.Quantity -= orderlineEntity.Quantity;
                    }
                    else if (this.oldOrderIDinOrderline != null && orderlineEntity.OrderID === null) {
                        productEntity.Quantity += orderlineEntity.Quantity;
                    }
                    await productRepository.save(productEntity)
                } else if (orderlineEntity.DiamondID != null) {
                    orderlineEntity.Price = diamondEntity.Price;
                    orderlineEntity.DiscountPrice = diamondEntity.DiscountPrice;
                    orderlineEntity.ProductID = null
                    if (orderlineEntity.OrderID != null && orderlineEntity.Quantity <= diamondEntity.Quantity) {
                        diamondEntity.Quantity = 0;
                    }
                    else if (this.oldOrderIDinOrderline != null && orderlineEntity.OrderID === null) {
                        diamondEntity.Quantity = 1;
                    }
                    await diamondRepository.save(diamondEntity)
                }
                const orderlinesEntity = await orderlineRepository.find({ where: { OrderID: orderEntity.OrderID } });
                const totalDiscountPrice = orderlinesEntity.reduce((total, orderline) => total + orderline.DiscountPrice, 0);
                if (orderEntity) {
                    orderEntity.Price = totalDiscountPrice;
                    await orderRepository.save(orderEntity);
                }
                await orderlineRepository.save(orderlineEntity);
                // await jewelrySettingVariantRepository.save(item);
                // }
                console.log('Cập nhật hoàn tất.');
            }
            else {
                const orderlineRepository = event.manager.getRepository(OrderLineEntity)
                orderlineEntity.Price = null;
                await orderlineRepository.save(orderlineEntity);

            }
        } finally {
            this.isHandlingUpdate = false
        }
    }
}