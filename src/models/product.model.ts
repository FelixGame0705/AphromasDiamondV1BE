import { Certificate } from "./certificate.model"
import { Diamond } from "./diamond.model"
import { Discount } from "./discount.model"
import { JewelrySetting } from "./jewelrySetting.model"
import { JewelrySettingVariant } from "./jewelrySettingVariant.model"
import { UsingImage } from "./usingImage.model"

export class Product{
    ProductID: number
    Name: string
    Brand: string
    Stars: number
    Quantity: number
    JewelrySettingID: number
    AccountID: number
    TotalDiamondPrice: number
    FirstPrice: number
    CollectionID: number
    DiscountID: number
    TotalQuantityJewelrySettingVariants: number
    Discount: Discount
    UsingImage: UsingImage[]
    Diamond: Diamond[]
    JewelrySetting: JewelrySetting    
    constructor({ProductID, Name, Brand,JewelrySettingID, AccountID, TotalDiamondPrice, FirstPrice, CollectionID, DiscountID, UsingImage, Diamond, JewelrySetting, TotalQuantityJewelrySettingVariants, Discount, Stars, Quantity}){
        this.ProductID = ProductID
        this.Name = Name
        this.Brand = Brand
        this.JewelrySettingID = JewelrySettingID
        this.AccountID = AccountID
        this.TotalDiamondPrice = TotalDiamondPrice
        this.FirstPrice = FirstPrice
        this.CollectionID = CollectionID
        this.DiscountID = DiscountID
        this.Discount = Discount
        this.UsingImage = UsingImage
        this.Diamond = Diamond
        this.TotalQuantityJewelrySettingVariants = TotalQuantityJewelrySettingVariants
        this.JewelrySetting = JewelrySetting
        this.Stars = Stars
        this.Quantity = Quantity
    }
}

export class ProductDetail{
    ProductID: number
    Name: string
    Brand: string
    Stars: number
    Quantity: number
    JewelrySettingID: number
    AccountID: number
    TotalDiamondPrice: number
    FirstPrice: number
    CollectionID: number
    DiscountID: number
    TotalQuantityJewelrySettingVariants: number
    Discount: Discount
    UsingImage: UsingImage[]
    Diamond: Diamond[]
    JewelrySetting: JewelrySetting    
    JewelrySettingVariant: any[]
    constructor({ProductID, Name, Brand,JewelrySettingID, AccountID, TotalDiamondPrice, FirstPrice, CollectionID, DiscountID, UsingImage, Diamond, JewelrySetting, TotalQuantityJewelrySettingVariants, Discount, Stars, Quantity, JewelrySettingVariant}){
        this.ProductID = ProductID
        this.Name = Name
        this.Brand = Brand
        this.JewelrySettingID = JewelrySettingID
        this.AccountID = AccountID
        this.TotalDiamondPrice = TotalDiamondPrice
        this.CollectionID = CollectionID
        this.DiscountID = DiscountID
        this.Discount = Discount
        this.UsingImage = UsingImage
        this.Diamond = Diamond
        this.TotalQuantityJewelrySettingVariants = TotalQuantityJewelrySettingVariants
        this.FirstPrice = FirstPrice
        this.JewelrySetting = JewelrySetting
        this.Stars = Stars
        this.Quantity = Quantity
        this.JewelrySettingVariant = JewelrySettingVariant
    }
}

