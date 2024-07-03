import { Module } from '@nestjs/common';
import { UsingImageController } from './usingImage.controller';
import { UsingImageService } from './usingImage.service';

@Module({
  controllers: [UsingImageController],
  providers: [UsingImageService]
})
export class UsingImageModule {}
