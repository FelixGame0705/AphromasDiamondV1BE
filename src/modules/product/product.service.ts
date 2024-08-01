import { Inject, Injectable } from "@nestjs/common";
import { ProductDTO } from "src/dto/product.dto";
import { ProductEntity } from "src/entities/products.entity";
import { IJewelrySettingRepository } from "src/interfaces/IJewelrySettingRepository";
import { IProductRepository } from "src/interfaces/IProductRepository"
import { Diamond } from "src/models/diamond.model";
import { Product, ProductDetail } from "src/models/product.model";
import { JewelrySettingService } from "../jewelrySetting/jewelrySetting.service";
import { SizeService } from "../size/size.service";
import { JewelrySetting } from "src/models/jewelrySetting.model";
import { IDiamondRepository } from "src/interfaces/IDiamondRepository";
import Decimal from "decimal.js";
import { Discount } from "src/models/discount.model";
import { PRODUCT_PER_PAGE } from "src/constants/constant";

@Injectable()
export class ProductService {
    constructor(
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
        @Inject('IDiamondRepository')
        private readonly diamondRepository: IDiamondRepository,
    ) {

    }
    async findAll(): Promise<Product[]> {

        let data = await this.productRepository.findAll();
        const modifiedData = Promise.all(data.map(async item => {
            // Lấy giá của từng viên kim cương trong `item.diamonds` có cùng `ProductID`
            const prices = item.diamonds
                .filter(diamond => diamond.ProductID === item.ProductID)
                .map(diamond => Number(diamond.Price));
            let jewelrySettingAmount = null
            let minPriceVariant = null
            if (item.jewelrySetting != null) {
                jewelrySettingAmount = item.jewelrySetting?.jewelrySettingVariant
                    .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
                    .map(variant => variant.Quantity);
                minPriceVariant = Math.min(
                    ...item.jewelrySetting?.jewelrySettingVariant
                        .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
                        .map(variant => variant.Price)
                );

            }
            let percentDiscount = 0;
            if(item.discount != null && item.discount?.PercentDiscounts != null){
                percentDiscount = item.discount.PercentDiscounts;
            }



            console.log(item)

            // Tính tổng giá trị của các viên kim cương
            const totalPrice = Number(prices.reduce((acc, current) => acc + current, 0));
            const totaljewelrySettingAmount = jewelrySettingAmount?.reduce((acc, current) => acc + current, 0);
            return new Product({
                ProductID: item.ProductID,
                AccountID: item.AccountID,
                Brand: item.Brand,
                Stars: item.Stars,
                CollectionID: item.CollectionID,
                DiscountID: item.DiscountID,
                Discount: item.discount ? new Discount(item.discount as Discount) : null,
                Name: item.Name,
                Description: item.Description,
                JewelrySettingID: item.JewelrySettingID,
                TotalDiamondPrice: (new Decimal(totalPrice)).toDecimalPlaces(2).toNumber(),
                FirstPrice: (new Decimal(totalPrice)).toDecimalPlaces(2).toNumber() + minPriceVariant,
                DiscountFirstPrice: ((new Decimal(totalPrice)).toDecimalPlaces(2).toNumber() + minPriceVariant)*(100-percentDiscount)/100,
                UsingImage: item.usingImage,
                Diamond: item.diamonds,
                Quantity: item.Quantity,
                JewelrySetting: item.jewelrySetting,
                TotalQuantityJewelrySettingVariants: totaljewelrySettingAmount
            })
        }))
        return modifiedData;
    }

    async getProducts(page: number, filters: any, sort: { field: any; order: any; }) {
        const perPage = PRODUCT_PER_PAGE;
        return this.productRepository.paginateAndFilter(page, perPage, filters, sort);
    }

    async findById(id: number): Promise<ProductDetail> {
        let item = await this.productRepository.findRelationById(id);
        console.log("hello" + item)
        const prices = item.diamonds
            .map(diamond => Number(diamond.Price));
        const jewelrySettingAmount = item.jewelrySetting?.jewelrySettingVariant
            .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
            .map(variant => variant.Quantity);
        const minPriceVariant = Math.min(
            ...item.jewelrySetting?.jewelrySettingVariant
                .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
                .map(variant => variant.Price)
        );
        let percentDiscount = 0;
            if(item.discount != null && item.discount?.PercentDiscounts != null){
                percentDiscount = item.discount.PercentDiscounts;
            }
        const totalPrice = prices.reduce((acc, current) => acc + current, 0);
        const totaljewelrySettingAmount = jewelrySettingAmount.reduce((acc, current) => acc + current, 0);
        const modifiedData = new ProductDetail({
            ProductID: item.ProductID,
            AccountID: item.AccountID,
            Brand: item.Brand,
            Stars: item.Stars,
            CollectionID: item.CollectionID,
            DiscountID: item.DiscountID,
            Discount: item.discount ? new Discount(item.discount as Discount) : null,
            Name: item.Name,
            Description: item.Description,
            JewelrySettingID: item.JewelrySettingID,
            TotalDiamondPrice: (new Decimal(totalPrice)).toDecimalPlaces(2).toNumber(),
            FirstPrice: (new Decimal(totalPrice)).toDecimalPlaces(2).toNumber() + minPriceVariant,
            DiscountFirstPrice: ((new Decimal(totalPrice)).toDecimalPlaces(2).toNumber() + minPriceVariant)*(100-percentDiscount)/100,
            UsingImage: item.usingImage,
            Diamond: item.diamonds,
            Quantity: item.Quantity,
            JewelrySettingVariant: item.jewelrySetting.jewelrySettingVariant.map((item) => {
                return {
                    Material: item.materialJewelry,
                    Quantity: item.Quantity
                };
            }
            ),
            JewelrySetting: item.jewelrySetting || null,
            TotalQuantityJewelrySettingVariants: totaljewelrySettingAmount

        })
        return modifiedData;
    }


    async create(product: ProductDTO): Promise<Product> {
        let itemCreate = await this.productRepository.create(product);
        let item = await this.productRepository.findRelationById(itemCreate.ProductID);
        for (let i = 0; i < product.diamondArray?.length || 0; i++) {
            await this.diamondRepository.update(product.diamondArray[i], { ProductID: item.ProductID })
        }

        const prices = item.diamonds
            .map(diamond => Number(diamond.Price));
        const jewelrySettingAmount = item.jewelrySetting?.jewelrySettingVariant
            .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
            .map(variant => variant.Quantity);
        const minPriceVariant = Math.min(
            ...item.jewelrySetting?.jewelrySettingVariant
                .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
                .map(variant => variant.Price)
        );
        let percentDiscount = 0;
            if(item.discount != null && item.discount?.PercentDiscounts != null){
                percentDiscount = item.discount.PercentDiscounts;
            }
        const totalPrice = prices.reduce((acc, current) => acc + current, 0);
        const totaljewelrySettingAmount = jewelrySettingAmount.reduce((acc, current) => acc + current, 0);
        const modifiedData = new Product({
            ProductID: item.ProductID,
            AccountID: item.AccountID,
            Brand: item.Brand,
            Stars: item.Stars,
            CollectionID: item.CollectionID,
            DiscountID: item.DiscountID,
            Discount: item.discount ? new Discount(item.discount as Discount) : null,
            Name: item.Name,
            Description: item.Description,
            JewelrySettingID: item.JewelrySettingID,
            TotalDiamondPrice: (new Decimal(totalPrice)).toDecimalPlaces(2).toNumber(),
            FirstPrice: (new Decimal(totalPrice)).toDecimalPlaces(2).toNumber() + minPriceVariant,
            DiscountFirstPrice: ((new Decimal(totalPrice)).toDecimalPlaces(2).toNumber() + minPriceVariant)*(100-percentDiscount)/100,
            UsingImage: item.usingImage,
            Diamond: item.diamonds,
            JewelrySetting: item.jewelrySetting,
            Quantity: item.Quantity,
            TotalQuantityJewelrySettingVariants: totaljewelrySettingAmount
        })
        return modifiedData;
    }
    async update(id: number, product: ProductDTO): Promise<Product> {
        let itemCreate = await this.productRepository.update(id, {
            JewelrySettingID: product.JewelrySettingID,
            Name: product.Name,
            Brand: product.Brand,
            AccountID: product.AccountID,
            CollectionID: product.CollectionID,
            DiscountID: product.DiscountID
        });
        let item = await this.productRepository.findRelationById(itemCreate.ProductID);
        for (let i = 0; i < product.diamondArray?.length || 0; i++) {
            await this.diamondRepository.update(product.diamondArray[i], { ProductID: item.ProductID })
        }

        const prices = item.diamonds
            .map(diamond => Number(diamond.Price));
        const jewelrySettingAmount = item.jewelrySetting?.jewelrySettingVariant
            .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
            .map(variant => variant.Quantity);
        const minPriceVariant = Math.min(
            ...item.jewelrySetting?.jewelrySettingVariant
                .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
                .map(variant => variant.Price)
        );
        let percentDiscount = 0;
            if(item.discount != null && item.discount?.PercentDiscounts != null){
                percentDiscount = item.discount.PercentDiscounts;
            }
        const totalPrice = prices.reduce((acc, current) => acc + current, 0);
        const totaljewelrySettingAmount = jewelrySettingAmount.reduce((acc, current) => acc + current, 0);
        const modifiedData = new Product({
            ProductID: item.ProductID,
            AccountID: item.AccountID,
            Brand: item.Brand,
            Stars: item.Stars,
            CollectionID: item.CollectionID,
            DiscountID: item.DiscountID,
            Discount: item.discount ? new Discount(item.discount as Discount) : null,
            Name: item.Name,
            Description: item.Description,
            JewelrySettingID: item.JewelrySettingID,
            TotalDiamondPrice: (new Decimal(totalPrice)).toDecimalPlaces(2).toNumber(),
            FirstPrice: (new Decimal(totalPrice)).toDecimalPlaces(2).toNumber() + minPriceVariant,
            DiscountFirstPrice: ((new Decimal(totalPrice)).toDecimalPlaces(2).toNumber() + minPriceVariant)*(100-percentDiscount)/100,
            UsingImage: item.usingImage,
            Diamond: item.diamonds,
            JewelrySetting: item.jewelrySetting,
            Quantity: item.Quantity,
            TotalQuantityJewelrySettingVariants: totaljewelrySettingAmount
        })
        return modifiedData;
    }
    async delete(id: number): Promise<boolean> {
        return await this.productRepository.delete(id);
    }
    async findRelationById(id: number): Promise<ProductDetail> {
        let item = await this.productRepository.findRelationById(id);
        console.log(item)
        const prices = item.diamonds
            .map(diamond => Number(diamond.Price));
        const jewelrySettingAmount = item.jewelrySetting?.jewelrySettingVariant
            .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
            .map(variant => variant.Quantity);
        const minPriceVariant = Math.min(
            ...item.jewelrySetting?.jewelrySettingVariant
                .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
                .map(variant => variant.Price),
        );
        let percentDiscount = 0;
            if(item.discount != null && item.discount?.PercentDiscounts != null){
                percentDiscount = item.discount.PercentDiscounts;
            }
        const totalPrice = prices.reduce((acc, current) => acc + current, 0);
        const totaljewelrySettingAmount = jewelrySettingAmount.reduce((acc, current) => acc + current, 0);
        const modifiedData = new ProductDetail({
            ProductID: item.ProductID,
            AccountID: item.AccountID,
            Brand: item.Brand,
            Stars: item.Stars,
            CollectionID: item.CollectionID,
            DiscountID: item.DiscountID,
            Discount: item.discount ? new Discount(item.discount as Discount) : null,
            Name: item.Name,
            Description: item.Description,
            JewelrySettingID: item.JewelrySettingID,
            TotalDiamondPrice: (new Decimal(totalPrice)).toDecimalPlaces(2).toNumber(),
            FirstPrice: (new Decimal(totalPrice)).toDecimalPlaces(2).toNumber() + minPriceVariant,
            DiscountFirstPrice: ((new Decimal(totalPrice)).toDecimalPlaces(2).toNumber() + minPriceVariant)*(100-percentDiscount)/100,
            UsingImage: item.usingImage,
            Diamond: item.diamonds,
            JewelrySetting: item.jewelrySetting,
            JewelrySettingVariant: item.jewelrySetting.jewelrySettingVariant.map((item) => {
                return {
                    Material: item.materialJewelry,
                    Quantity: item.Quantity
                };
            }
            ),
            Quantity: item.Quantity,
            TotalQuantityJewelrySettingVariants: totaljewelrySettingAmount
        })
        return modifiedData;
    }
}