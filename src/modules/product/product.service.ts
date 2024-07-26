import { Inject, Injectable } from "@nestjs/common";
import { ProductDTO } from "src/dto/product.dto";
import { ProductEntity } from "src/entities/products.entity";
import { IJewelrySettingRepository } from "src/interfaces/IJewelrySettingRepository";
import { IProductRepository } from "src/interfaces/IProductRepository"
import { Diamond } from "src/models/diamond.model";
import { Product } from "src/models/product.model";
import { JewelrySettingService } from "../jewelrySetting/jewelrySetting.service";
import { SizeService } from "../size/size.service";
import { JewelrySetting } from "src/models/jewelrySetting.model";
import { IDiamondRepository } from "src/interfaces/IDiamondRepository";
import Decimal from "decimal.js";
import { Discount } from "src/models/discount.model";

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
            if (item.jewelrySetting != null) {
                jewelrySettingAmount = item.jewelrySetting?.jewelrySettingVariant
                    .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
                    .map(variant => variant.Quantity);
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
                Inscription: item.Inscription,
                InscriptionFont: item.InscriptionFont,
                Name: item.Name,
                JewelrySettingID: item.JewelrySettingID,
                TotalDiamondPrice: (new Decimal(totalPrice)).toDecimalPlaces(2).toNumber(),
                UsingImage: item.usingImage,
                Diamond: item.diamonds,
                Quantity: item.Quantity,
                JewelrySetting: item.jewelrySetting,
                JewelrySettingVariantID: item.JewelrySettingVariantID,
                TotalQuantityJewelrySettingVariants: totaljewelrySettingAmount
            })
        }))
        return modifiedData;
    }
    async findById(id: number): Promise<Product> {
        let item = await this.productRepository.findRelationById(id);
        let diamond = await this
        console.log("hello" + item)
        const prices = item.diamonds
            .map(diamond => Number(diamond.Price));
        const jewelrySettingAmount = item.jewelrySetting?.jewelrySettingVariant
            .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
            .map(variant => variant.Quantity);
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
            Inscription: item.Inscription,
            InscriptionFont: item.InscriptionFont,
            Name: item.Name,
            JewelrySettingID: item.JewelrySettingID,
            TotalDiamondPrice: (new Decimal(totalPrice)).toDecimalPlaces(2).toNumber(),
            UsingImage: item.usingImage,
            Diamond: item.diamonds,
            Quantity: item.Quantity,
            JewelrySetting: item.jewelrySetting || null,
            JewelrySettingVariantID: item.JewelrySettingVariantID,
            TotalQuantityJewelrySettingVariants: totaljewelrySettingAmount

        })
        return modifiedData;
    }


    async create(product: ProductDTO): Promise<Product> {
        let itemCreate = await this.productRepository.create(product);
        let item = await this.productRepository.findRelationById(itemCreate.ProductID);
        for (let i = 0; i < product.diamondArray.length; i++) {
            await this.diamondRepository.update(product.diamondArray[i], { ProductID: item.ProductID })
        }

        const prices = item.diamonds
            .map(diamond => Number(diamond.Price));
        const jewelrySettingAmount = item.jewelrySetting?.jewelrySettingVariant
            .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
            .map(variant => variant.Quantity);
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
            Inscription: item.Inscription,
            InscriptionFont: item.InscriptionFont,
            Name: item.Name,
            JewelrySettingID: item.JewelrySettingID,
            TotalDiamondPrice: (new Decimal(totalPrice)).toDecimalPlaces(2).toNumber(),
            UsingImage: item.usingImage,
            Diamond: item.diamonds,
            JewelrySetting: item.jewelrySetting,
            Quantity: item.Quantity,
            JewelrySettingVariantID: item.JewelrySettingVariantID,
            TotalQuantityJewelrySettingVariants: totaljewelrySettingAmount
        })
        return modifiedData;
    }
    async update(id: number, product: ProductDTO): Promise<Product> {
        let itemCreate = await this.productRepository.update(id, {
            JewelrySettingID: product.JewelrySettingID,
            JewelrySettingVariantID: product.JewelrySettingVariantID,
            Name: product.Name,
            Inscription: product.Inscription,
            InscriptionFont: product.InscriptionFont,
            Brand: product.Brand,
            AccountID: product.AccountID,
            CollectionID: product.CollectionID,
            DiscountID: product.DiscountID
        });
        let item = await this.productRepository.findRelationById(itemCreate.ProductID);
        for (let i = 0; i < product.diamondArray.length; i++) {
            await this.diamondRepository.update(product.diamondArray[i], { ProductID: item.ProductID })
        }

        const prices = item.diamonds
            .map(diamond => Number(diamond.Price));
        const jewelrySettingAmount = item.jewelrySetting?.jewelrySettingVariant
            .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
            .map(variant => variant.Quantity);
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
            Inscription: item.Inscription,
            InscriptionFont: item.InscriptionFont,
            Name: item.Name,
            JewelrySettingID: item.JewelrySettingID,
            TotalDiamondPrice: (new Decimal(totalPrice)).toDecimalPlaces(2).toNumber(),
            UsingImage: item.usingImage,
            Diamond: item.diamonds,
            JewelrySetting: item.jewelrySetting,
            Quantity: item.Quantity,
            JewelrySettingVariantID: item.JewelrySettingVariantID,
            TotalQuantityJewelrySettingVariants: totaljewelrySettingAmount
        })
        return modifiedData;
    }
    async delete(id: number): Promise<boolean> {
        return await this.productRepository.delete(id);
    }
    async findRelationById(id: number): Promise<Product> {
        let item = await this.productRepository.findRelationById(id);
        console.log(item)
        const prices = item.diamonds
            .map(diamond => Number(diamond.Price));
        const jewelrySettingAmount = item.jewelrySetting?.jewelrySettingVariant
            .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
            .map(variant => variant.Quantity);
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
            Inscription: item.Inscription,
            InscriptionFont: item.InscriptionFont,
            Name: item.Name,
            JewelrySettingID: item.JewelrySettingID,
            TotalDiamondPrice: (new Decimal(totalPrice)).toDecimalPlaces(2).toNumber(),
            UsingImage: item.usingImage,
            Diamond: item.diamonds,
            JewelrySetting: item.jewelrySetting,
            JewelrySettingVariantID: item.JewelrySettingVariantID,
            Quantity: item.Quantity,
            TotalQuantityJewelrySettingVariants: totaljewelrySettingAmount
        })
        return modifiedData;
    }
}