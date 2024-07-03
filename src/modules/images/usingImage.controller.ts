import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsingImageService } from './usingImage.service';
import { Response } from 'express';
import { join } from 'path';

@Controller('usingImage')
export class UsingImageController {

constructor(private readonly usingImageService: UsingImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', usingImageService.getMulterOptions()))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return { filename: file.filename, path: file.path };
  }

  @Get('uploads/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '../../uploads', filename);
    res.sendFile(filePath);
  }
}
