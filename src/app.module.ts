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
import { BillDiscountEntity } from './entities/billDiscount.entity';
import { CertificateEntity } from './entities/certificate.entity';
import { CustomerEntity } from './entities/customer.entity';
import { JewelryTypeEntity } from './entities/jewelryType.entity';
import { MaterialJewelryEntity } from './entities/marterialJewelry.entity';
import { NotificationEntity } from './entities/notification.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderLineEntity } from './entities/orderLine.entity';
import { ProductEntity } from './entities/product.entity';
import { ShellEntity } from './entities/shell.entity';
import { dataSourceOptions } from 'db/data-source';
import { NotificationModule } from './modules/notification/notification.module';
import { OrderModule } from './modules/order/order.module';
import { OrderLineModule } from './modules/orderline/orderLine.module';
import { ProductModule } from './modules/product/product.module';
import { JewelryTypeModule } from './modules/jewelrytype/jewelrytype.module';
import { MaterialJewelryModule } from './modules/materialjewelry/materialjewelry.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      entities: [DiamondEntity, AccountsEntity, BillDiscountEntity, CertificateEntity,CustomerEntity, JewelryTypeEntity,MaterialJewelryEntity,
        NotificationEntity,OrderEntity,OrderLineEntity,ProductEntity,ShellEntity
      ]
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '90m' },
    }),
    AuthModule,
    UserModule,
    DiamondModule, NotificationModule, OrderModule, OrderLineModule, ProductModule, JewelryTypeModule, MaterialJewelryModule
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
