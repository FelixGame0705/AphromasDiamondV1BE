import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { APP_GUARD } from '@nestjs/core';
// import { User } from './modules/users/user.entity';
// import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccountsEntity } from './entities/accounts.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constant';
import { UserModule } from './modules/user/user.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { RolesGuard } from './modules/auth/roles.guard';
import { DiamondModule } from './modules/diamond/diamond.module';
import { DiamondEntity } from './entities/diamond.entity';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'diamondaphromas',
    entities: [AccountsEntity, DiamondEntity, NotificationEntity],
    synchronize: true,
  }), JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: {expiresIn: 900000}
  }), AuthModule, UserModule, DiamondModule, NotificationModule
],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: AuthGuard
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard
  }
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
