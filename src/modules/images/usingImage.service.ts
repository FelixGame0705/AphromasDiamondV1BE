import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { IUsingImageRepository } from 'src/interfaces/IUsingImageRepository';
import { UsingImage } from 'src/models/usingImage.model';

@Injectable()
export class UsingImageService {
  [x: string]: any;
  constructor(
    @Inject('IUsingImageRepository')
    private readonly usingImageRepository: IUsingImageRepository
  ) {

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
