import { NotificationEntity } from "src/entities/notification.entity";
import { setSeederFactory } from "typeorm-extension";

export const  notificationFactory = setSeederFactory(NotificationEntity, async (faker) => {
     
      
    const notification = new  NotificationEntity()
    notification.IsRead = faker.datatype.boolean();
    notification.Date = faker.date.recent();
    notification.Message = faker.lorem.sentence();
    notification.AccountID = faker.datatype.number({ min: 5, max: 999999 });  
    
    return notification;
  })