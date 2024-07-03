import { Module } from '@nestjs/common';
import { UsingImageController } from './usingImage.controller';
import { UsingImageService } from './usingImage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsingImageEntity } from 'src/entities/usingImage.entity';
import { UsingImageRepository } from './usingImage.repository';
import { MulterModule } from '@nestjs/platform-express';
import { initMulterDiskStorage } from 'src/constants/multer-storage';

@Module({
  imports: [TypeOrmModule.forFeature([UsingImageEntity]),
  MulterModule.register({ storage: initMulterDiskStorage("public/uploads") }),
],
  controllers: [UsingImageController],
  providers: [UsingImageService, {
    useClass: UsingImageRepository,
    provide: 'IUsingImageRepository'}]
})
export class UsingImageModule {}
