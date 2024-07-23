import { NotificationEntity } from "src/entities/notification.entity";
import { setSeederFactory } from "typeorm-extension";

export const  notificationFactory = setSeederFactory(NotificationEntity, async (faker) => {
     
      
    const notification = new  NotificationEntity()
    notification.IsRead = faker.datatype.boolean();
    notification.Date = faker.date.recent();
    const messages = [
      "Thank you for your purchase! Expect order confirmation within 1-3 business days. Shipping times: Domestic 5-7 days, Expedited 2-3 days, International 7-14 days. For questions, contact us at [info@gmail.com].",
      "Your order has been shipped! You can track your shipment using the tracking number provided in the confirmation email. Estimated delivery time: 5-7 business days.",
      "Your payment has been processed successfully. Thank you for choosing us! If you have any questions, please reach out to our support team at [info@gmail.com].",
      "A new promotional offer is available! Get up to 20% off on selected items. Visit our website for more details and shop now!",
      "Your order has been successfully delivered! We hope you enjoy your purchase. For any issues or feedback, contact us at [info@gmail.com]."
    ];
    notification.Message = faker.helpers.arrayElement(messages);

    // notification.AccountID = faker.datatype.number({ min: 5, max: 999999 });  
    
    return notification;
  })