export class Notification {
    NotificationID: number
    IsRead: boolean
    Date: Date
    Message: string

    constructor({NotificationID, IsRead, Date, Message}){
        if(NotificationID != undefined)this.NotificationID = NotificationID
        if(IsRead != undefined)this.IsRead = IsRead;
        if(Date !=undefined)this.Date=Date;
        if(Message !=undefined)this.Message=Message;
    }
}