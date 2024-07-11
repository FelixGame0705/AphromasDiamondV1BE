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

@Injectable()
export class ProductService {
    constructor(
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
        private jewelrySettingService: JewelrySettingService
    ) {

    }
    async findAll(): Promise<Product[]> {

        let data = await this.productRepository.findAll();
        const modifiedData = Promise.all(data.map(async item => {
            // Lấy giá của từng viên kim cương trong `item.diamonds` có cùng `ProductID`
            const prices = item.diamonds
                .filter(diamond => diamond.ProductID === item.ProductID)
                .map(diamond => diamond.Price);
            const jewelrySettingAmount = item.jewelrySetting.jewelrySettingVariant
                .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
                .map(variant => variant.Amount);
            // Tính tổng giá trị của các viên kim cương
            const totalPrice = prices.reduce((acc, current) => acc + current, 0);
            const totaljewelrySettingAmount = jewelrySettingAmount.reduce((acc, current) => acc + current, 0);
            return new Product({
                ProductID: item.ProductID,
                AccountID: item.AccountID,
                Brand: item.Brand,
                CollectionID: item.CollectionID,
                DiscountID: item.DiscountID,
                Inscription: item.Inscription,
                InscriptionFont: item.InscriptionFont,
                Name: item.Name,
                JewelrySettingID: item.JewelrySettingID,
                TotalDiamondPrice: totalPrice,
                UsingImage: item.usingImage,
                Diamond: item.diamonds,
                JewelrySetting: item.jewelrySetting,
                Amount: totaljewelrySettingAmount
            })
        }))
        return modifiedData;
    }
    async findById(id: number): Promise<Product> {
        let item = await this.productRepository.findRelationById(id);
        console.log("hello" + item)
        const prices = item.diamonds
            .map(diamond => diamond.Price * diamond.ChargeRate);
        const jewelrySettingAmount = item.jewelrySetting.jewelrySettingVariant
            .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
            .map(variant => variant.Amount);
        const totalPrice = prices.reduce((acc, current) => acc + current, 0);
        const totaljewelrySettingAmount = jewelrySettingAmount.reduce((acc, current) => acc + current, 0);
        const modifiedData = new Product({
            ProductID: item.ProductID,
            AccountID: item.AccountID,
            Brand: item.Brand,
            CollectionID: item.CollectionID,
            DiscountID: item.DiscountID,
            Inscription: item.Inscription,
            InscriptionFont: item.InscriptionFont,
            Name: item.Name,
            JewelrySettingID: item.JewelrySettingID,
            TotalDiamondPrice: totalPrice,
            UsingImage: item.usingImage,
            Diamond: item.diamonds,
            JewelrySetting: item.jewelrySetting,
            Amount: totaljewelrySettingAmount

        })
        return modifiedData;
    }


    async create(product: ProductDTO): Promise<Product> {
        let itemCreate = await this.productRepository.create(product);
        let item = await this.productRepository.findRelationById(itemCreate.ProductID);
        const prices = item.diamonds
            .map(diamond => diamond.Price);
        const jewelrySettingAmount = item.jewelrySetting.jewelrySettingVariant
            .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
            .map(variant => variant.Amount);
        const totalPrice = prices.reduce((acc, current) => acc + current, 0);
        const totaljewelrySettingAmount = jewelrySettingAmount.reduce((acc, current) => acc + current, 0);
        const modifiedData = new Product({
            ProductID: item.ProductID,
            AccountID: item.AccountID,
            Brand: item.Brand,
            CollectionID: item.CollectionID,
            DiscountID: item.DiscountID,
            Inscription: item.Inscription,
            InscriptionFont: item.InscriptionFont,
            Name: item.Name,
            JewelrySettingID: item.JewelrySettingID,
            TotalDiamondPrice: totalPrice,
            UsingImage: item.usingImage,
            Diamond: item.diamonds,
            JewelrySetting: item.jewelrySetting,
            Amount: totaljewelrySettingAmount
        })
        return modifiedData;
    }
    async update(id: number, product: ProductDTO): Promise<Product> {
        await this.productRepository.update(id, product);
        return this.findById(id);
    }
    async delete(id: number): Promise<boolean> {
        return await this.productRepository.delete(id);
    }
    async findRelationById(id: number): Promise<Product> {
        let item = await this.productRepository.findRelationById(id);
        console.log("hello" + item)
        const prices = item.diamonds
            .map(diamond => diamond.Price);
        const jewelrySettingAmount = item.jewelrySetting.jewelrySettingVariant
            .filter(variant => variant.JewelrySettingID === item.jewelrySetting.JewelrySettingID)
            .map(variant => variant.Amount);
        const totalPrice = prices.reduce((acc, current) => acc + current, 0);
        const totaljewelrySettingAmount = jewelrySettingAmount.reduce((acc, current) => acc + current, 0);
        const modifiedData = new Product({
            ProductID: item.ProductID,
            AccountID: item.AccountID,
            Brand: item.Brand,
            CollectionID: item.CollectionID,
            DiscountID: item.DiscountID,
            Inscription: item.Inscription,
            InscriptionFont: item.InscriptionFont,
            Name: item.Name,
            JewelrySettingID: item.JewelrySettingID,
            TotalDiamondPrice: totalPrice,
            UsingImage: item.usingImage,
            Diamond: item.diamonds,
            JewelrySetting: item.jewelrySetting,
            Amount: totaljewelrySettingAmount
        })
        return modifiedData;
    }
}