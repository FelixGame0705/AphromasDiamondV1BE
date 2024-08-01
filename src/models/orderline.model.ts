export class OrderLine{
    OrderLineID: number
    Quantity: number
    Price: number
    DiscountPrice: number
    Inscription: string
    InscriptionFont: string
    OrderID: number
    DiamondID: number
    ProductID: number
    CustomerID: number
    SizeID: number
    JewelrySettingVariantID: number
    constructor({OrderLineID, Quantity, Price, DiscountPrice, Inscription, InscriptionFont,OrderID, DiamondID, ProductID, CustomerID, SizeID, JewelrySettingVariantID}){
        this.OrderLineID = OrderLineID
        this.Quantity = Quantity
        this.OrderID = OrderID
        this.DiamondID = DiamondID
        this.ProductID = ProductID
        this.CustomerID = CustomerID
        this.Price = Price
        this.DiscountPrice = DiscountPrice
        this.Inscription = Inscription
        this.InscriptionFont = InscriptionFont
        this.SizeID = SizeID
        this.JewelrySettingVariantID = JewelrySettingVariantID
    }
}