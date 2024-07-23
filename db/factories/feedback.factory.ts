import { FeedbackEntity } from "src/entities/feedback.entity";
import { setSeederFactory } from "typeorm-extension";

export const feedbackFactory = setSeederFactory( FeedbackEntity, async (faker) => {
     
      
    const feedback = new FeedbackEntity()
    feedback.Stars = faker.datatype.number({ min: 3.0, max: 5.0, precision: 0.1 });
    feedback.Comment = faker.lorem.sentence();
    feedback.CommentTime = faker.date.recent();
    feedback.IsActive = faker.datatype.boolean();
    //foreign key
    // feedback.DiamondID = faker.datatype.number({ min: 1, max: 10 });
    // feedback.JewelrySettingID = faker.datatype.number({ min: 1, max: 10 });
    // feedback.OrderID = faker.datatype.number({ min: 1, max: 10 });
    // feedback.AccountID = faker.datatype.number({ min: 1, max: 10 });
    // feedback.ProductID = faker.datatype.number({ min: 1, max: 10 });   
    return  feedback;
  })