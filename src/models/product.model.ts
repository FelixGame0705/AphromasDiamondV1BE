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
    Amount: number
    UsingImage: UsingImage[]
    Diamond: Diamond[]
    JewelrySetting: JewelrySetting[]
    constructor({ProductID, Name, Inscription, InscriptionFont, Brand,JewelrySettingID, AccountID, TotalDiamondPrice, CollectionID, DiscountID, UsingImage, Diamond, JewelrySetting, Amount}){
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
        this.UsingImage = UsingImage
        this.Diamond = Diamond
        this.Amount = Amount
        this.JewelrySetting = JewelrySetting
    }
}
