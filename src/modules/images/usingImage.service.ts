import { Inject, Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { IUsingImageRepository } from 'src/interfaces/IUsingImageRepository';
import { UsingImage } from 'src/models/usingImage.model';

@Injectable()
export class UsingImageService {
  constructor(
    @Inject('IUsingImageRepository')
    private readonly usingImageRepository: IUsingImageRepository
  ) {

  }
  async findAll(): Promise<UsingImage[]> {
    return (await this.usingImageRepository.findAll()).map(item => new UsingImage(item));
  }
  async findById(id: number): Promise<UsingImage> {
    return await this.usingImageRepository.findById(id);
  }
  async create(usingImage: UsingImageDTO): Promise<UsingImage> {
    return await this.usingImageRepository.create(usingImage);
  }
  async update(id: number, usingImage: UsingImageDTO): Promise<UsingImage> {
    await this.usingImageRepository.update(id, usingImage);
    return this.findById(id);
  }
  async delete(id: number): Promise<boolean> {
    return await this.usingImageRepository.delete(id);
  }
  async findRelationById(id: number): Promise<UsingImage> {
    return await this.usingImageRepository.findRelationById(id);
  }
  getMulterOptions() {
    return {
      storage: diskStorage({
        destination: './uploads', // Thư mục lưu trữ tệp tin
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    };
  }
}
