import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthPayloadDTO, AuthPermission } from './../src/dto/auth.dto';
import { AuthModule } from './../src/modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './../src/app.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './../src/modules/auth/auth.guard';
import { RolesGuard } from './../src/modules/auth/roles.guard';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsEntity } from './../src/entities/accounts.entity';
import { CustomerEntity } from './../src/entities/customer.entity';
import { dataSourceOptions } from '../db/data-source';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });

  it('/auth/signin (POST)', async () => {
    const authPayload: AuthPayloadDTO = {
      Email: 'tiesn@gmail.com',
      Password: 'duongso142',
      Name: null,
      PhoneNumber: null,
      Role: null
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(authPayload)
      .expect(201);

    console.log(response.body);  // In ra phản hồi để kiểm tra

    expect(response.body).toBeDefined();
    expect(response.body.statusCode).toBe(200);
    expect(response.body.message).toBe('Server Response Success');
    expect(response.body.data.id).toBe(2);
    expect(response.body.data.token).toBeDefined();
    expect(response.body.data.expredTime).toBe(900000);
  });
  afterAll(async () => {
    await app.close();
  });
});
