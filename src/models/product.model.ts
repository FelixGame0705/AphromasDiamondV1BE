export class Product{
    ProductID: number
    Name: string
    Inscription: string
    InscriptionFont: string
    Brand: string
    JewelrySettingID: number
    AccountID: number
    //Price: number
    CollectionID: number
    DiscountID: number

    constructor({ProductID, Name, Inscription, InscriptionFont, Brand,JewelrySettingID, AccountID, CollectionID, DiscountID}){
        this.ProductID = ProductID
        this.Name = Name
        this.Inscription = Inscription
        this.InscriptionFont = InscriptionFont
        this.Brand = Brand
        this.JewelrySettingID = JewelrySettingID
        this.AccountID = AccountID
        //this.Price = Price
        this.CollectionID = CollectionID
        this.DiscountID = DiscountID
    }
}
