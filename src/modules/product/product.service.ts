import { Inject, Injectable } from "@nestjs/common";
import { ProductDTO } from "src/dto/product.dto";
import { ProductEntity } from "src/entities/products.entity";
import { IJewelrySettingRepository } from "src/interfaces/IJewelrySettingRepository";
import { IProductRepository } from "src/interfaces/IProductRepository"
import { Diamond } from "src/models/diamond.model";
import { Product } from "src/models/product.model";
import { JewelrySettingService } from "../jewelrySetting/jewelrySetting.service";
import { SizeService } from "../size/size.service";

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
                let dataJewelrySetting = null;
                if(item.ProductID != null) {
                    try {
                        dataJewelrySetting = await this.jewelrySettingService.findById(item.ProductID);
                    } catch (e) {
                        console.error(`JewelrySetting with ProductID ${item.ProductID} not found`);
                    }
                }
            // Tính tổng giá trị của các viên kim cương
            const totalPrice = prices.reduce((acc, current) => acc + current, 0);

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
                Price: totalPrice,
                UsingImage: item.usingImage,
                Diamond: item.diamonds,
                JewelrySetting: dataJewelrySetting || null
            })
        }))
        return modifiedData;
    }
    async findById(id: number): Promise<Product> {
        let item = await this.productRepository.findRelationById(id);
        console.log("hello"+item)
        const prices = item.diamonds
        .map(diamond => diamond.Price * diamond.ChargeRate);
        const totalPrice = prices.reduce((acc, current) => acc + current, 0);
        const dataJewelrySetting =  (await this.jewelrySettingService.findById(item.ProductID))
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
            Price: totalPrice,
            UsingImage: item.usingImage,
            Diamond: item.diamonds,
            JewelrySetting: dataJewelrySetting,
            
        })
        return modifiedData;
    }


    async create(product: ProductDTO): Promise<Product> {
        let itemCreate = await this.productRepository.create(product);
        let item = await this.productRepository.findRelationById(itemCreate.ProductID);
        let dataJewelrySetting =  null
        if(itemCreate.ProductID != null) {
            try {
                dataJewelrySetting = await this.jewelrySettingService.findById(item.ProductID);
            } catch (e) {
                console.error(`JewelrySetting with ProductID ${item.ProductID} not found`);
            }
        }
        const prices = item.diamonds
        .map(diamond => diamond.Price);
        const totalPrice = prices.reduce((acc, current) => acc + current, 0);
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
            Price: totalPrice,
            UsingImage: item.usingImage,
            Diamond: item.diamonds,
            JewelrySetting: dataJewelrySetting
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
        console.log("hello"+item)
        const prices = item.diamonds
        .map(diamond => diamond.Price);
        const dataJewelrySetting =  (await this.jewelrySettingService.findById(item.ProductID))
        const totalPrice = prices.reduce((acc, current) => acc + current, 0);
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
            Price: totalPrice,
            UsingImage: item.usingImage,
            Diamond: item.diamonds,
            JewelrySetting: dataJewelrySetting
        })
        return modifiedData;
    }
}