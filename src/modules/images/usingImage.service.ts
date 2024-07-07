import { Body, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsingImageDTO, UsingImageUpdateDTO } from 'src/dto/usingImage.dto';
import { IUsingImageRepository } from 'src/interfaces/IUsingImageRepository';
import { UsingImage } from 'src/models/usingImage.model';

@Injectable()
export class UsingImageService {
  constructor(
    @Inject('IUsingImageRepository')
    private readonly usingImageRepository: IUsingImageRepository
  ) {

  }

  async findById(id: number): Promise<UsingImage> {
    return await this.usingImageRepository.findById(id);
  }

  async update(id: number, usingImage: UsingImageUpdateDTO): Promise<UsingImage> {
    await this.usingImageRepository.update(id, usingImage);
    return this.findById(id);
  }
  async create(files: Express.Multer.File[], @Body() UsingImageDTO: UsingImageDTO) {
    if (isNaN(UsingImageDTO.ProductID)) UsingImageDTO.ProductID = null;
    if (isNaN(UsingImageDTO.DiamondID)) UsingImageDTO.DiamondID = null;
    if (isNaN(UsingImageDTO.JewelrySettingID)) UsingImageDTO.JewelrySettingID = null;
    if (isNaN(UsingImageDTO.CertificateID)) UsingImageDTO.CertificateID = null;

    return await Promise.all(
        files.map((item) =>
            this.usingImageRepository.create({
                ProductID: UsingImageDTO.ProductID || null,
                Name: item.filename,
                DiamondID: UsingImageDTO.DiamondID || null,
                JewelrySettingID: UsingImageDTO.JewelrySettingID || null,
                CertificateID: UsingImageDTO.CertificateID || null,
                url: item.destination,
            }),
        ),
    );
}

  async getOneById(id: number) {
    const entity = await this.usingImageRepository.findById(id);
    if (!entity) throw new NotFoundException();
    return entity;
  }
}
