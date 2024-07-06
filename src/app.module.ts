import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsEntity } from './entities/accounts.entity';
import { DiamondEntity } from './entities/diamond.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constant';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DiamondModule } from './modules/diamond/diamond.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { RolesGuard } from './modules/auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { VoucherEntity } from './entities/voucher.entity';
import { CertificateEntity } from './entities/certificate.entity';
import { CustomerEntity } from './entities/customer.entity';
import { JewelryTypeEntity } from './entities/jewelryType.entity';
import { MaterialJewelryEntity } from './entities/marterialJewelry.entity';
import { NotificationEntity } from './entities/notification.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderLineEntity } from './entities/orderLine.entity';
import { JewelrySettingEntity } from './entities/jewelrySetting.entity';
import dataSource, { dataSourceOptions } from 'db/data-source';
import { NotificationModule } from './modules/notification/notification.module';
import { OrderModule } from './modules/order/order.module';
import { OrderLineModule } from './modules/orderline/orderLine.module';
import { JewelryTypeModule } from './modules/jewelryType/jewelryType.module';
import { MaterialJewelryModule } from './modules/materialjewelry/materialjewelry.module';
import { FeedbackEntity } from './entities/feedback.entity';
import { JewelrySettingModule } from './modules/jewelrySetting/jewelrySetting.module';
import { SizeEntity } from './entities/size.entity';
import { JewelrySettingVariantEntity } from './entities/jewlrySettingVariant.entity';
import { SizeModule } from './modules/size/size.module';
import { JewelrySettingVariantModule } from './modules/jewelrySettingVariant/jewelrySettingVariant.module';
import { ProductEntity } from './entities/products.entity';
import { CollectionEntity } from './entities/collection.entity';
import { DiscountEntity } from './entities/discount.entity';
import { CollectionModule } from './modules/collection/collection.module';
// <<<<<<< HEAD
import { DiscountModule } from './modules/discount/discount.module';
// =======
import { UsingImageModule } from './modules/images/usingImage.module';
import { UsingImageEntity } from './entities/usingImage.entity';
import { FeedbackModule } from './modules/feedback/feedback.module';
<<<<<<< HEAD
import { CertificateModule } from './modules/certificate/certificate.module';
// >>>>>>> develop
=======
import { DataSource } from 'typeorm';
import { DbModule } from 'db/db.module';
>>>>>>> 2be04b10bbb3e92d60ffe722ddcef133a3d880f4
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      entities: [DiamondEntity, AccountsEntity, VoucherEntity, CertificateEntity,CustomerEntity, JewelryTypeEntity,MaterialJewelryEntity,
        NotificationEntity,OrderEntity,OrderLineEntity, JewelrySettingEntity, FeedbackEntity, SizeEntity, JewelrySettingVariantEntity, ProductEntity,CollectionEntity, DiscountEntity, UsingImageEntity
      ]
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '90m' },
    }),
    DbModule,
    AuthModule,
    UserModule,
    DiamondModule, NotificationModule, OrderModule, OrderLineModule, JewelryTypeModule, MaterialJewelryModule, JewelrySettingModule, FeedbackModule, CertificateModule,
// <<<<<<< HEAD
    SizeModule, JewelrySettingVariantModule, CollectionModule, DiscountModule,
// =======
    SizeModule, JewelrySettingVariantModule, CollectionModule, UsingImageModule
// >>>>>>> develop
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
