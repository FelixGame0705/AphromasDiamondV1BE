import { FromDatabaseDateTime } from "src/constants/date-util"

export class Feedback{
    FeedbackID: number
    Stars: number
    Comment: string
    CommentTime: Date
    IsActive: boolean
    DiamondID: number
    ProductID: number
    OrderID: number
    AccountID: number
    constructor({FeedbackID,Stars,Comment, CommentTime, IsActive, DiamondID
        ,ProductID, OrderID, AccountID
    }){
        this.FeedbackID = FeedbackID
        this.Stars = Stars
        this.Comment = Comment
        this.CommentTime = CommentTime
        this.IsActive = IsActive
        this.DiamondID = DiamondID
        this.ProductID = ProductID
        this.OrderID = OrderID
        this.AccountID = AccountID
    }
}