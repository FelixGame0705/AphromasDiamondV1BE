import { Diamond } from "./diamond.model"
import { JewelrySetting } from "./jewelrySetting.model"
import { UsingImage } from "./usingImage.model"

export class Product{
    ProductID: number
    Name: string
    Inscription: string
    InscriptionFont: string
    Brand: string
    JewelrySettingID: number
    AccountID: number
    TotalDiamondPrice: number
    CollectionID: number
    DiscountID: number
    UsingImage: UsingImage[]
    Diamond: Diamond[]
    JewelrySetting: JewelrySetting[]
    constructor({ProductID, Name, Inscription, InscriptionFont, Brand,JewelrySettingID, AccountID, Price, CollectionID, DiscountID, UsingImage, Diamond, JewelrySetting}){
        this.ProductID = ProductID
        this.Name = Name
        this.Inscription = Inscription
        this.InscriptionFont = InscriptionFont
        this.Brand = Brand
        this.JewelrySettingID = JewelrySettingID
        this.AccountID = AccountID
        this.TotalDiamondPrice = Price
        this.CollectionID = CollectionID
        this.DiscountID = DiscountID
        this.UsingImage = UsingImage
        this.Diamond = Diamond
        this.JewelrySetting = JewelrySetting
    }
}
