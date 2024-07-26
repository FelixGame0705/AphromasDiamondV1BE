import { Certificate } from "./certificate.model"
import { Diamond } from "./diamond.model"
import { Discount } from "./discount.model"
import { JewelrySetting } from "./jewelrySetting.model"
import { JewelrySettingVariant } from "./jewelrySettingVariant.model"
import { UsingImage } from "./usingImage.model"

export class Product{
    ProductID: number
    Name: string
    Inscription: string
    InscriptionFont: string
    Brand: string
    Stars: number
    Quantity: number
    JewelrySettingID: number
    AccountID: number
    TotalDiamondPrice: number
    CollectionID: number
    DiscountID: number
    TotalQuantityJewelrySettingVariants: number
    Discount: Discount
    UsingImage: UsingImage[]
    Diamond: Diamond[]
    JewelrySetting: JewelrySetting
    JewelrySettingVariantID: number
    constructor({ProductID, Name, Inscription, InscriptionFont, Brand,JewelrySettingID, AccountID, TotalDiamondPrice, CollectionID, DiscountID, UsingImage, Diamond, JewelrySetting, TotalQuantityJewelrySettingVariants, JewelrySettingVariantID, Discount, Stars, Quantity}){
        this.ProductID = ProductID
        this.Name = Name
        this.Inscription = Inscription
        this.InscriptionFont = InscriptionFont
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
        this.JewelrySetting = JewelrySetting
        this.JewelrySettingVariantID = JewelrySettingVariantID
        this.Stars = Stars
        this.Quantity = Quantity
    }
}
