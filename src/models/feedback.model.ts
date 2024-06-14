import { FromDatabaseDateTime } from "src/constants/date-util"

export class Feedback{
    FeedbackID: number
    Stars: number
    Comment: string
    @FromDatabaseDateTime()
    CommentTime: Date
    IsActive: boolean
    DiamondID: number
    ShellID: number
    OrderID: number
    AccountID: number
    constructor({FeedbackID,Stars,Comment, CommentTime, IsActive, DiamondID
        ,ShellID, OrderID, AccountID
    }){
        this.FeedbackID = FeedbackID
        this.Stars = Stars
        this.Comment = Comment
        this.CommentTime = CommentTime
        this.IsActive = IsActive
        this.DiamondID = DiamondID
        this.ShellID = ShellID
        this.OrderID = OrderID
        this.AccountID = AccountID
    }
}