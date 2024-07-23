 

import { CollectionEntity } from 'src/entities/collection.entity';
import { setSeederFactory } from 'typeorm-extension';

// Danh sách tên bộ sưu tập sang trọng
 

export const collectionFactory = setSeederFactory(CollectionEntity, async (faker) => {
  const collection = new CollectionEntity()
  const luxuryCollectionNames = [
    'Celestial Dreams', 'Royal Opulence', 'Ethereal Elegance', 'Timeless Treasures', 'Midnight Glamour', 'Regal Radiance', 'Whispering Diamonds'
    ,'Diamond Delight', 'Diamond Dynasty','Topaz Twilight'
  ];

  // Chọn ngẫu nhiên một tên từ danh sách và đảm bảo không trùng lặp
  collection.CollectionName = `${faker.helpers.unique(
    faker.helpers.arrayElement,
    [luxuryCollectionNames]
  )} Collection` as string;

  // Mô tả chung cho bộ sưu tập trang sức
  collection.Description = `Introducing the ${collection.CollectionName} - a breathtaking ensemble of exquisite jewelry that embodies timeless elegance and contemporary allure. This meticulously curated collection showcases the pinnacle of craftsmanship, featuring an array of stunning pieces that seamlessly blend precious metals with dazzling gemstones.

From intricately designed necklaces that grace the neckline with unparalleled sophistication, to statement earrings that capture the light with every movement, each piece in the ${collection.CollectionName} tells a story of luxury and refinement. The collection includes versatile bracelets that add a touch of glamour to any ensemble, and rings that serve as enduring symbols of style and personal expression.

Inspired by ${faker.lorem.words(3)}, this collection harmoniously combines classic designs with modern twists, appealing to those who appreciate both tradition and innovation in their jewelry. Whether for a special occasion or everyday elegance, the ${collection.CollectionName} offers something truly special for every discerning individual.

Embrace the extraordinary and elevate your personal style with the ${collection.CollectionName} - where every piece is a masterpiece, designed to be treasured for generations.`;

  collection.DebutTime = faker.date.past(1);
    
  return collection;
})