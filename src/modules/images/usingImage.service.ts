import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
  create(files: Express.Multer.File[]) {
		return files.map((item) =>
				this.usingImageRepository.create({
					Name: item.filename,
					// mimetype: item.mimetype,
					url: item.destination,
				}),
			)
	}

	async getOneById(id: number) {
		const entity = await this.usingImageRepository.findById(id);
		if (!entity) throw new NotFoundException();
		return entity;
	}
}
