export class Notification {
    NotificationId: number
    IsRead: number
    Date: number
    Message: string

    constructor({NotificationId, IsRead, Date, Message}){
        if(NotificationId != undefined)this.NotificationId = NotificationId;
        if(IsRead != undefined)this.IsRead = IsRead;
        if(Date !=undefined)this.Date=Date;
        if(Message !=undefined)this.Message=Message;
    }
}